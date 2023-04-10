import {
  AUTH0_DOMAIN,
  AUTH0_ACCESS_TOKEN
} from '#config/users-exports'
import getAccessToken from '#utils/get-access-token'
import sleepFor, {
  ONE_SECOND,
  QUARTER_SECOND
} from '#utils/sleep-for'
import handleError from '#utils/handle-error'

const LENGTH = 475000 // 500000 - 5%

const DURATION = ONE_SECOND + QUARTER_SECOND

function getStatus ({ status } = {}) {
  return status
}

export async function * genUsers (fileData) {
  let FROM = null
  let TO = null
  let USERS = []

  let i = 0
  while (fileData.length) {
    const user = fileData.shift()

    if (FROM === null) FROM = i // first

    const users = USERS.concat(user)

    if (JSON.stringify(users).length < LENGTH) {
      TO = i // last
      USERS = users
      i = i + 1
    } else {
      fileData.unshift(user)
      yield {
        users: USERS,
        from: FROM,
        to: TO
      }
      FROM = null
      USERS = []
    }
  }

  yield {
    users: USERS,
    from: FROM,
    to: TO
  }
  FROM = null
  TO = null
  USERS = []
}

export async function getJobById (id) {
  try {
    const response = await fetch(`https://${AUTH0_DOMAIN}/api/v2/jobs/${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${AUTH0_ACCESS_TOKEN || await getAccessToken()}`
      }
    })

    return response.json()
  } catch (e) {
    handleError(e)
  }
}

async function app (id) {
  const status = await getJobById(id)

  if (getStatus(status) === 'completed') return status
}

async function run (id, done) {
  try {
    const status = await app(id)
    if (status) done(null, status)
    else {
      setImmediate(async function handleImmediate () {
        await sleepFor(DURATION)

        await run(id, done)
      })
    }
  } catch (e) {
    done(e)
  }
}

export function waitForJob (id) {
  return (
    new Promise((resolve, reject) => {
      run(id, function handleComplete (e, v) {
        (!e)
          ? resolve(v)
          : reject(e)
      })
    })
  )
}

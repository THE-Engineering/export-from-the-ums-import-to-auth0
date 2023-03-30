import {
  AUTH0_DOMAIN,
  AUTH0_ACCESS_TOKEN
} from '#config/users-exports'
import readFromFilePath from '#utils/read-from-file-path'
import getFileName from '#utils/get-file-name'
import getAccessToken from '#utils/get-access-token'
import sleepFor, {
  ONE_SECOND,
  QUARTER_SECOND
} from '#utils/sleep-for'

const LENGTH = 475000 // 500000 - 5%
const DURATION = ONE_SECOND + QUARTER_SECOND

function getStatus ({ status } = {}) {
  return status
}

export async function * genUsers (filePathList) {
  let FROM = null
  let TO = null
  let USERS = []

  /**
   *  It should arrive sorted, but
   */
  filePathList.sort()

  while (filePathList.length) {
    const filePath = filePathList.shift()

    if (!FROM) FROM = getFileName(filePath)

    const users = USERS.concat(
      await readFromFilePath(filePath)
    )

    if (JSON.stringify(users).length < LENGTH) {
      TO = getFileName(filePath)
      USERS = users
    } else {
      filePathList.unshift(filePath)
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
  const response = await fetch(`https://${AUTH0_DOMAIN}/api/v2/jobs/${id}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${AUTH0_ACCESS_TOKEN || await getAccessToken()}`
    }
  })

  return response.json()
}

export async function waitForJob (id) {
  const status = await getJobById(id)

  if (getStatus(status) === 'completed') return status

  await sleepFor(DURATION)

  return (
    await waitForJob(id)
  )
}

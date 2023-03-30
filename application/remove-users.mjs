import {
  AUTH0_DOMAIN,
  AUTH0_ACCESS_TOKEN
} from '#config/users-exports'
import getAccessToken from '#utils/get-access-token'
import hasUserEmail from '#utils/has-user-email'
import getUserEmail from '#utils/get-user-email'
import hasUserId from '#utils/has-user-id'
import getUserId from '#utils/get-user-id'
import sleepFor, {
  ONE_SECOND
} from '#utils/sleep-for'

export {
  genUsers
} from './common/index.mjs'

export async function getUsersByEmail (email) {
  const url = new URL(`https://${AUTH0_DOMAIN}/api/v2/users`)

  url.search = new URLSearchParams({
    q: email
  })

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${AUTH0_ACCESS_TOKEN || await getAccessToken()}`
    }
  })

  return response.json()
}

export async function deleteUserById (id) {
  await fetch(`https://${AUTH0_DOMAIN}/api/v2/users/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${AUTH0_ACCESS_TOKEN || await getAccessToken()}`
    }
  })
}

export async function removeByEmail (users = []) {
  while (users.length) {
    const user = users.shift()

    if (hasUserEmail(user)) {
      await removeById(
        await getUsersByEmail(
          getUserEmail(user)
        )
      )

      await sleepFor(ONE_SECOND)
    }
  }
}

export async function removeById (users = []) {
  while (users.length) {
    const user = users.shift()

    if (hasUserId(user)) {
      const userId = getUserId(user)

      console.log(`👉 ${userId}`)
      try {
        await deleteUserById(userId)
      } catch {
        users.push(user)
      }

      await sleepFor(ONE_SECOND)
    }
  }
}

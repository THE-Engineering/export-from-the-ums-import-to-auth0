import {
  AUTH0_DOMAIN,
  AUTH0_ACCESS_TOKEN,
  AUTH0_CONNECTION_ID
} from '#config/users-exports'
import getAccessToken from '#utils/get-access-token'
import handleError from '#utils/handle-error'

const JSON_DATA = JSON.stringify({
  format: 'json',
  connection_id: AUTH0_CONNECTION_ID,
  fields: [
    {
      name: 'user_id'
    },
    {
      name: 'email'
    },
    {
      name: 'family_name'
    },
    {
      name: 'given_name'
    }
  ]
})

export {
  waitForJob,
  getJobById
} from './common/index.mjs'

export async function getJobBlob (location) {
  try {
    const response = await fetch(location)

    return response.blob()
  } catch (e) {
    handleError(e)
  }
}

export default async function createJob () {
  try {
    const response = await fetch(`https://${AUTH0_DOMAIN}/api/v2/jobs/users-exports`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${AUTH0_ACCESS_TOKEN || await getAccessToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON_DATA
    })

    return response.json()
  } catch (e) {
    handleError(e)
  }
}

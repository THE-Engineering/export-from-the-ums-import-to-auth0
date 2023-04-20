import {
  Blob
} from 'node:buffer'
import {
  AUTH0_DOMAIN,
  AUTH0_ACCESS_TOKEN,
  AUTH0_CONNECTION_ID,
  AUTH0_UPSERT
} from '#config/users-imports'
import getAccessToken from '#utils/get-access-token'
import handleError from '#utils/handle-error'

export {
  genUsers,
  waitForJob,
  getJobById
} from './common/index.mjs'

async function getFormData (users) {
  const formData = new FormData()
  const textEncoder = new TextEncoder()
  const blob = new Blob([textEncoder.encode(JSON.stringify(users))], { type: 'application/json' })

  formData.set('connection_id', AUTH0_CONNECTION_ID)
  formData.set('upsert', AUTH0_UPSERT)
  formData.set('users', blob, 'users-imports.json')

  return formData
}

export default async function createJob (users) {
  try {
    const response = await fetch(`https://${AUTH0_DOMAIN}/api/v2/jobs/users-imports`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${AUTH0_ACCESS_TOKEN || await getAccessToken()}`
      },
      body: await getFormData(users)
    })

    return response.json()
  } catch (e) {
    handleError(e)
  }
}

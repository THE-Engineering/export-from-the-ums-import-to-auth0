import {
  AUTH0_RESOURCE,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_AUDIENCE
} from '#config/users-imports'

let AUTHORIZATION = {}
let AUTHORIZED_AT = 0

function isExpired ({ expires_in: expiresIn = 0 } = {}) {
  /*
   *  `expiresIn` is a number of SECONDS
   *  `authorisedAt` is a number representing a date in MILLISECONDS
   */
  return (
    AUTHORIZED_AT + (expiresIn * 1000)
  ) < Date.now()
}

// https://auth0.com/docs/secure/tokens/access-tokens/get-management-api-access-tokens-for-production
async function getAuthorizationFromResource () {
  const response = await fetch(AUTH0_RESOURCE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      client_id: AUTH0_CLIENT_ID,
      client_secret: AUTH0_CLIENT_SECRET,
      audience: AUTH0_AUDIENCE,
      grant_type: 'client_credentials'
    })
  })

  return await response.json()
}

async function getAuthorization () {
  if (isExpired(AUTHORIZATION)) {
    AUTHORIZATION = await getAuthorizationFromResource()
    AUTHORIZED_AT = Date.now()
  }

  return AUTHORIZATION
}

export default async function getAccessToken () {
  const {
    access_token: accessToken
  } = await getAuthorization()

  return accessToken
}

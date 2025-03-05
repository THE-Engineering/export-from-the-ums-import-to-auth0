import {
  ALGORITHM,
  ITERATIONS,
  KEY_LENGTH
} from '#config/transform-users'

const PATTERN = /={1,2}$/

export default function transformUser ({
  mail: email,
  first_name: givenName,
  last_name: familyName,
  salt,
  pass: hash,
  uid
}) {
  const SALT = salt.replace(PATTERN, '')
  const HASH = hash.replace(PATTERN, '')

  const userObject = {
    email,
    custom_password_hash: {
      algorithm: 'pbkdf2',
      hash: {
        value: `$${ALGORITHM}$i=${ITERATIONS},l=${KEY_LENGTH}$${SALT}$${HASH}`
      }
    },
    user_metadata: {
      origin: 'mariadb',
      uid
    }
  }

  if (familyName) {
    userObject.family_name = (familyName || '').trim()
  }

  if (givenName) {
    userObject.given_name = (givenName || '').trim()
  }

  return userObject
}

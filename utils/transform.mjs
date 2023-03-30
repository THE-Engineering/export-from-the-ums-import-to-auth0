import {
  ALGORITHM,
  ITERATIONS,
  KEY_LENGTH
} from '#config/transform'

const PATTERN = /={1,2}$/

export default function transform ({
  mail: email,
  first_name: firstName,
  last_name: lastName,
  salt,
  pass: hash,
  uid
}) {
  const SALT = salt.replace(PATTERN, '')
  const HASH = hash.replace(PATTERN, '')

  return {
    email,
    given_name: (firstName || '').trim(),
    family_name: (lastName || '').trim(),
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
}

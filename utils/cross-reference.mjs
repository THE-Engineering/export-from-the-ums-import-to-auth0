
import getUserEmail from './get-user-email.mjs'
import getUserMail from './get-user-mail.mjs'
import hasUserEmail from './has-user-email.mjs'
import hasUserMail from './has-user-mail.mjs'

function isNullish (value) {
  return value === 'null' || value === 'undefined'
}

function getEmail (user) {
  return String(
    (hasUserMail(user) ? getUserMail(user) : hasUserEmail(user) ? getUserEmail(user) : null) || null
  )
}

export default function crossReference (users, user) {
  const email = getEmail(user).toLowerCase()

  if (isNullish(email)) return false

  return users.some((user) => email === getEmail(user).toLowerCase())
}

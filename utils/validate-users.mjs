/**
 *  Validates email addresses
 *
 *  This has been developed with a sample of users imported into Auth0
 *  to predict how many users Auth0 will reject during a full import
 *
 *  It isn't used -- and should not be used -- to filter users for import.
 *  We dispatch every user to Auth0 and let Auth0 decide which users are
 *  unacceptable
 *
 *  Presently, Auth0
 *    - Ignores casing
 *    - Disallows usernames with plus characters
 *    - Allows non-standard domains like `.academy`
 *    - Disallows TLDs with numbers
 *
 *  Email address usernames with plus characters are known as "subaddresses"
 *
 *    https://simplelogin.io/blog/email-alias-vs-plus-sign/
 *
 *  It's popular but not particularly good for privacy. I'm suprised Auth0
 *  disallows it, tho
 *
 *  Note again that this method exists to predict which users Auth0 will
 *  reject but not to solve the problem of how to import them
 */
const EMAIL = /^[\w-\.]+@([\w-]+\.)+[a-z]{2,}$/i // eslint-disable-line no-useless-escape

/**
 * Validates that the user has the expected structure
 */
export default function validate ({
  mail,
  // name,
  first_name: firstName,
  last_name: lastName,
  pass,
  salt
}) {
  return Boolean(
    EMAIL.test(mail || '') &&
    // name &&
    (firstName || '').trim() &&
    (lastName || '').trim() &&
    pass &&
    salt
  )
}

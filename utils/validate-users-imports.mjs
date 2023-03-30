/**
 * Validates that the user has the expected structure
 */
export default function validate ({
  email,
  given_name: givenName,
  family_name: familyName,
  custom_password_hash: {
    algorithm,
    hash: {
      value
    } = {}
  } = {}
}) {
  return Boolean(
    email &&
    givenName &&
    familyName &&
    algorithm &&
    value
  )
}

/**
 * Validates that the user has the expected structure
 */
export default function validate ({
  user_id: userId,
  email,
  given_name: givenName,
  family_name: familyName
}) {
  return Boolean(
    userId &&
    email &&
    givenName &&
    familyName
  )
}

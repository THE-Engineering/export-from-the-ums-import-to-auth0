import getConnection from '#utils/get-connection'

export default async function getUsers () {
  const connection = await getConnection()
  const rows = await connection.query(`
  WITH
    Users AS (
      SELECT
        users.uid,
        users_field_data.name as name,
        users_field_data.mail as mail,
        the_password.pass as pass,
        the_password.salt as salt
      FROM
        users
        JOIN users_field_data
          ON users.uid = users_field_data.uid
        JOIN the_password
          ON users_field_data.uid = the_password.uid),
    Profile AS (
      SELECT
        profile.uid,
        profile__field_first_name.field_first_name_value AS first_name,
        profile__field_last_name.field_last_name_value AS last_name
      FROM
        profile
        JOIN profile__field_first_name
          ON profile.profile_id = profile__field_first_name.entity_id
        JOIN profile__field_last_name
          ON profile.profile_id = profile__field_last_name.entity_id)
  SELECT
    users.uid,
    users.name,
    users.mail,
    users.pass,
    users.salt,
    profile.first_name,
    profile.last_name
  FROM Users AS users
    JOIN Profile AS profile
      ON users.uid = profile.uid
  ORDER BY users.uid
  LIMIT 3000;
  `.trim())

  await connection.end()
  return rows
}

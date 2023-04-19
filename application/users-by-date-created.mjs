import getConnection from '#utils/get-connection'

function getUsersByDateCreatedSql (date) {
  return `
WITH
  Users AS (
    SELECT
      users.uid,
      users_field_data.created as date_created,
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
  users.date_created,
  users.name,
  users.mail,
  users.pass,
  users.salt,
  profile.first_name,
  profile.last_name
FROM Users AS users
  JOIN Profile AS profile
    ON users.uid = profile.uid
WHERE
  users.date_created >= ${date}
ORDER BY users.uid
`
}

function getUsersByDateCreatedWithLimitSql (usersSql, limit) {
  return `
${usersSql.trim()}
LIMIT ${limit}
`
}

export default async function getUsersByDate (date = Date.now(), limit = 0) {
  const usersSql = getUsersByDateCreatedSql(date)
  const querySql = (
    limit
      ? getUsersByDateCreatedWithLimitSql(usersSql, limit)
      : usersSql
  ).trim() + ';'

  const connection = await getConnection()
  const rows = await connection.query(querySql)

  await connection.end()
  return rows
}

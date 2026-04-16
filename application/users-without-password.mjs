import getConnection from '#utils/get-connection'

function getUsersWithoutPasswordSql (FAKE_PASS_HASH, FAKE_SALT_HASH) {
  return `
          WITH
            Users AS (
              SELECT
                users.uid,
                users_field_data.created as date_created,
                users_field_data.name as name,
                users_field_data.mail as mail,
                "${FAKE_PASS_HASH}" as pass,
                "${FAKE_SALT_HASH}" as salt
              FROM
                users
                  JOIN users_field_data
                       ON users.uid = users_field_data.uid),
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
                 LEFT JOIN Profile AS profile
                           ON users.uid = profile.uid
          WHERE users.uid
                  NOT IN
                (SELECT tp.uid
                 FROM the_password tp)
          ORDER BY users.uid
  `
}

function getUsersWithoutPasswordWithLimitSql (usersSql, limit) {
  return `
${usersSql.trim()}
LIMIT ${limit}
`
}

export default async function getUsersWithoutPassword (limit = 0, offset = 0, FAKE_PASS_HASH, FAKE_SALT_HASH) {
  const usersSql = getUsersWithoutPasswordSql(FAKE_PASS_HASH, FAKE_SALT_HASH)
  const LIMIT_SQL = (
    limit
      ? getUsersWithoutPasswordWithLimitSql(usersSql, limit)
      : usersSql
  )

  const OFFSET_SQL = (
    offset ? LIMIT_SQL + ` OFFSET ${offset}` : LIMIT_SQL
  )

  const querySql = (OFFSET_SQL).trim() + ';'

  const connection = await getConnection()
  const rows = await connection.query(querySql)

  await connection.end()
  return rows
}

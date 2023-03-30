import {
  homedir
} from 'node:os'
import {
  resolve
} from 'node:path'
import {
  readFile
} from 'node:fs/promises'
import {
  MARIADB_FILE,
  MARIADB_USER,
  MARIADB_PASSWORD,
  MARIADB_HOST,
  MARIADB_PORT,
  MARIADB_DATABASE
} from '#config/connection'

export default async function getConnectionConfig () {
  if (MARIADB_FILE) {
    const filePath = resolve(MARIADB_FILE.replace('~', homedir()))
    const fileData = await readFile(filePath)
    return JSON.parse(fileData.toString('utf8'))
  }

  return {
    user: MARIADB_USER,
    password: MARIADB_PASSWORD,
    host: MARIADB_HOST,
    port: MARIADB_PORT,
    database: MARIADB_DATABASE
  }
}

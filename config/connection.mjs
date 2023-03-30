
import args from './args.mjs'

let MARIADB_FILE
let MARIADB_USER
let MARIADB_PASSWORD
let MARIADB_HOST
let MARIADB_PORT
let MARIADB_DATABASE

if (args.has('MARIADB_FILE')) {
  MARIADB_FILE = args.get('MARIADB_FILE')
} else {
  if (!args.has('MARIADB_USER')) throw new Error('Parameter `MARIADB_USER` is required')
  MARIADB_USER = args.get('MARIADB_USER')

  if (!args.has('MARIADB_PASSWORD')) throw new Error('Parameter `MARIADB_PASSWORD` is required')
  MARIADB_PASSWORD = args.get('MARIADB_PASSWORD')

  if (!args.has('MARIADB_HOST')) throw new Error('Parameter `MARIADB_HOST` is required')
  MARIADB_HOST = args.get('MARIADB_HOST')

  if (!args.has('MARIADB_PORT')) throw new Error('Parameter `MARIADB_PORT` is required')
  MARIADB_PORT = args.get('MARIADB_PORT')

  if (!args.has('MARIADB_DATABASE')) throw new Error('Parameter `MARIADB_DATABASE` is required')
  MARIADB_DATABASE = args.get('MARIADB_DATABASE')
}

export {
  MARIADB_FILE,
  MARIADB_USER,
  MARIADB_PASSWORD,
  MARIADB_HOST,
  MARIADB_PORT,
  MARIADB_DATABASE
}

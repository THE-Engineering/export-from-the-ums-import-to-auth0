import {
  createConnection
} from 'mariadb'
import getConnectionConfig from './get-connection-config.mjs'

export default async function getConnection () {
  return (
    createConnection(
      await getConnectionConfig()
    )
  )
}

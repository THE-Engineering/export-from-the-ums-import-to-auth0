#!/usr/bin/env node

import {
  dirname
} from 'node:path'
import {
  ensureDir
} from 'fs-extra'
import {
  USERS_EXPORTS_PATH
} from '#config/users-exports'
import getUsersExports from '#utils/get-users-exports'
import {
  removeById
} from '#application/remove-users'

async function app () {
  await ensureDir(dirname(USERS_EXPORTS_PATH))

  console.log('🚀')

  const users = await getUsersExports(USERS_EXPORTS_PATH)
  await removeById(users)

  console.log('👍')
}

export default app()

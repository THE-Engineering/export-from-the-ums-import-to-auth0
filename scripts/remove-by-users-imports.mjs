#!/usr/bin/env node

import {
  ensureDir
} from 'fs-extra'
import {
  USERS_IMPORTS_PATH
} from '#config/users-imports'
import getUsersImports from '#utils/get-users-imports'
import {
  removeByEmail
} from '#application/remove-users'

async function app () {
  await ensureDir(USERS_IMPORTS_PATH)

  console.log('🚀')

  const users = await getUsersImports(USERS_IMPORTS_PATH)
  await removeByEmail(users)

  console.log('👍')
}

export default app()

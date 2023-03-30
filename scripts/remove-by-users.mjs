#!/usr/bin/env node

import {
  ensureDir
} from 'fs-extra'
import {
  ORIGIN
} from '#config/remove-users'
import getUsersFilePathList from '#utils/get-users-file-path-list'
import {
  genUsers,
  removeByEmail
} from '#application/remove-users'

async function app () {
  await ensureDir(ORIGIN)

  console.log('🚀')

  const filePathList = await getUsersFilePathList(ORIGIN)
  for await (const { users } of genUsers(filePathList)) await removeByEmail(users)

  console.log('👍')
}

export default app()

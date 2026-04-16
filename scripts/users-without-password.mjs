#!/usr/bin/env node

import {
  dirname
} from 'node:path'
import {
  ensureDir
} from 'fs-extra'
import {
  DESTINATION,
  LIMIT,
  OFFSET
} from '#config/users'
import {
  FAKE_PASS_HASH,
  FAKE_SALT_HASH
} from '#config/users-without-password'
import writeToFilePath from '#utils/write-to-file-path'
import sortByUid from '#utils/sort-by-uid'
import handleError from '#utils/handle-error'
import getUsersWithoutPasswordSql from '#application/users-without-password'

async function app () {
  await ensureDir(dirname(DESTINATION))

  console.log('🚀')

  try {
    const users = await getUsersWithoutPasswordSql(LIMIT, OFFSET, FAKE_PASS_HASH, FAKE_SALT_HASH)
    await writeToFilePath(DESTINATION, users.sort(sortByUid))
  } catch (e) {
    handleError(e)

    process.exit(1)
  }

  console.log('👍')
}

export default app()

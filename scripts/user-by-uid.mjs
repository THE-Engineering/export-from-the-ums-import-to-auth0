#!/usr/bin/env node

import {
  dirname
} from 'node:path'
import {
  ensureDir
} from 'fs-extra'
import {
  DESTINATION,
  DRUPAL_UID
} from '#config/user-by-uid'
import writeToFilePath from '#utils/write-to-file-path'
import sortByUid from '#utils/sort-by-uid'
import handleError from '#utils/handle-error'
import getUserByUid from '#application/user-by-uid'

async function app () {
  await ensureDir(dirname(DESTINATION))

  console.log('🚀')

  try {
    const users = await getUserByUid(DRUPAL_UID)
    await writeToFilePath(DESTINATION, users.sort(sortByUid))
  } catch (e) {
    handleError(e)

    process.exit(1)
  }

  console.log('👍')
}

export default app()

#!/usr/bin/env node

import {
  dirname
} from 'node:path'
import {
  ensureDir
} from 'fs-extra'
import {
  DESTINATION,
  DATE_CHANGED,
  LIMIT
} from '#config/users-by-date-changed'
import writeToFilePath from '#utils/write-to-file-path'
import sortByUid from '#utils/sort-by-uid'
import handleError from '#utils/handle-error'
import getUsersByDateChanged from '#application/users-by-date-changed'

async function app () {
  await ensureDir(dirname(DESTINATION))

  console.log('🚀')

  try {
    const users = await getUsersByDateChanged(DATE_CHANGED, LIMIT)
    await writeToFilePath(DESTINATION, users.sort(sortByUid))
  } catch (e) {
    handleError(e)

    process.exit(1)
  }

  console.log('👍')
}

export default app()

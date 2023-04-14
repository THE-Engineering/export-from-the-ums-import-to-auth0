#!/usr/bin/env node

import {
  dirname
} from 'node:path'
import {
  ensureDir
} from 'fs-extra'
import {
  DESTINATION,
  DATE_CHANGED
} from '#config/users-by-date-changed'
import writeToFilePath from '#utils/write-to-file-path'
import sortByUid from '#utils/sort-by-uid'
import handleError from '#utils/handle-error'
import getUsersByDateChanged from '#application/users-by-date-changed'

async function app () {
  await ensureDir(dirname(DESTINATION))

  console.log('🚀')

  try {
    const users = await getUsersByDateChanged(DATE_CHANGED)
    await writeToFilePath(DESTINATION, users.sort(sortByUid))
    console.log('👍')
  } catch (e) {
    handleError(e)

    process.exit(1)
  }
}

export default app()

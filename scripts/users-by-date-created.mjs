#!/usr/bin/env node

import {
  dirname
} from 'node:path'
import {
  ensureDir
} from 'fs-extra'
import {
  DESTINATION,
  DATE_CREATED,
  LIMIT
} from '#config/users-by-date-created'
import writeToFilePath from '#utils/write-to-file-path'
import sortByUid from '#utils/sort-by-uid'
import handleError from '#utils/handle-error'
import getUsersByDateCreated from '#application/users-by-date-created'

async function app () {
  await ensureDir(dirname(DESTINATION))

  console.log('🚀')

  try {
    const users = await getUsersByDateCreated(DATE_CREATED, LIMIT)
    await writeToFilePath(DESTINATION, users.sort(sortByUid))
  } catch (e) {
    handleError(e)

    process.exit(1)
  }

  console.log('👍')
}

export default app()

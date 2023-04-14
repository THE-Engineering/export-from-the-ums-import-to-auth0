#!/usr/bin/env node

import {
  dirname
} from 'node:path'
import {
  ensureDir
} from 'fs-extra'
import {
  ORIGIN,
  DESTINATION
} from '#config/validate-users'
import readFromFilePath from '#utils/read-from-file-path'
import writeToFilePath from '#utils/write-to-file-path'
import validateUsers from '#utils/validate-users'
import sortByUid from '#utils/sort-by-uid'
import handleError from '#utils/handle-error'

function validate (users = []) {
  return (
    validateUsers(users)
      .sort(sortByUid)
  )
}

async function app () {
  await ensureDir(dirname(ORIGIN))
  await ensureDir(dirname(DESTINATION))

  console.log('🚀')

  try {
    await writeToFilePath(DESTINATION,
      validate(
        await readFromFilePath(ORIGIN)
      )
    )
  } catch (e) {
    handleError(e)

    process.exit(1)
  }

  console.log('👍')
}

export default app()

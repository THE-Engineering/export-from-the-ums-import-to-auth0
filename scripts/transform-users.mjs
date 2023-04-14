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
} from '#config/transform'
import readFromFilePath from '#utils/read-from-file-path'
import writeToFilePath from '#utils/write-to-file-path'
import sortByUid from '#utils/sort-by-uid'
import transformUsers from '#utils/transform-users'
import handleError from '#utils/handle-error'

function transform (users = []) {
  return (
    transformUsers(
      users.sort(sortByUid)
    )
  )
}

async function app () {
  await ensureDir(dirname(ORIGIN))
  await ensureDir(dirname(DESTINATION))

  console.log('🚀')

  try {
    await writeToFilePath(DESTINATION,
      transform(
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

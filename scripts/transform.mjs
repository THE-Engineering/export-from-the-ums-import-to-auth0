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
import toUserFilePath from '#utils/to-user-file-path'
import readFromFilePath from '#utils/read-from-file-path'
import writeToFilePath from '#utils/write-to-file-path'
import sortByUid from '#utils/sort-by-uid'
import getUid from '#utils/get-uid'
import transform from '#utils/transform'
import handleError from '#utils/handle-error'

async function app () {
  await ensureDir(dirname(ORIGIN))
  await ensureDir(DESTINATION)

  console.log('🚀')
  try {
    const users = (await readFromFilePath(ORIGIN))
      .sort(sortByUid)
    while (users.length) {
      const user = users.shift()
      await writeToFilePath(toUserFilePath(DESTINATION, getUid(user)), transform(user))
    }

    console.log('👍')
  } catch (e) {
    handleError(e)

    process.exit(1)
  }
}

export default app()

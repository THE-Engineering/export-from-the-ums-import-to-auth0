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
import validate from '#utils/validate-users'
import sortByUid from '#utils/sort-by-uid'
import handleError from '#utils/handle-error'

function reduce (accumulator, user) {
  if (!validate(user)) accumulator.push(user)

  return accumulator
}

async function app () {
  await ensureDir(dirname(ORIGIN))
  await ensureDir(dirname(DESTINATION))

  console.log('🚀')

  try {
    const users = await readFromFilePath(ORIGIN)
    await writeToFilePath(DESTINATION, users.reduce(reduce, []).sort(sortByUid))

    console.log('👍')
  } catch (e) {
    handleError(e)

    process.exit(1)
  }
}

export default app()

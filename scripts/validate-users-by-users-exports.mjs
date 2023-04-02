#!/usr/bin/env node

import {
  dirname
} from 'node:path'
import {
  ensureDir
} from 'fs-extra'
import {
  ORIGIN,
  USERS_EXPORTS_PATH,
  DESTINATION
} from '#config/validate-users-by-users-exports'
import readFromFilePath from '#utils/read-from-file-path'
import getUsersExports from '#utils/get-users-exports'
import writeToFilePath from '#utils/write-to-file-path'
import hasUserEmail from '#utils/has-user-email'
import getUserEmail from '#utils/get-user-email'
import getUserMail from '#utils/get-user-mail'
import sortByUid from '#utils/sort-by-uid'
import handleError from '#utils/handle-error'

function toSet (usersExports) {
  return (
    new Set(
      usersExports
        .filter(hasUserEmail)
        .map((user) => getUserEmail(user).trim().toLowerCase())
    )
  )
}

function getReduce (usersExports) {
  return function reduce (accumulator, user) {
    if (!usersExports.has(getUserMail(user).trim().toLowerCase())) accumulator.push(user)

    return accumulator
  }
}

async function app () {
  await ensureDir(dirname(ORIGIN))
  await ensureDir(dirname(USERS_EXPORTS_PATH))
  await ensureDir(dirname(DESTINATION))

  console.log('🚀')

  try {
    const users = await readFromFilePath(ORIGIN)
    const usersExports = await getUsersExports(USERS_EXPORTS_PATH)
    await writeToFilePath(DESTINATION, users.reduce(getReduce(toSet(usersExports)), []).sort(sortByUid))

    console.log('👍')
  } catch (e) {
    handleError(e)

    process.exit(1)
  }
}

export default app()

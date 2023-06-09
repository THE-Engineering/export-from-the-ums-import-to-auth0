#!/usr/bin/env node

import {
  dirname
} from 'node:path'
import {
  ensureDir
} from 'fs-extra'
import {
  ORIGIN,
  USERS_PATH,
  DESTINATION
} from '#config/validate-users-imports-by-users'
import getUsersImports from '#utils/get-users-imports'
import readFromFilePath from '#utils/read-from-file-path'
import writeToFilePath from '#utils/write-to-file-path'
import hasUserMail from '#utils/has-user-mail'
import getUserMail from '#utils/get-user-mail'
import getUserEmail from '#utils/get-user-email'
import sortByUid from '#utils/sort-by-uid'
import handleError from '#utils/handle-error'

function toSet (users = []) {
  return (
    new Set(
      users
        .filter(hasUserMail)
        .map((user) => getUserMail(user).trim().toLowerCase())
    )
  )
}

function getReduce (users) {
  return function reduce (accumulator, user) {
    if (!users.has(getUserEmail(user).trim().toLowerCase())) accumulator.push(user)

    return accumulator
  }
}

async function app () {
  await ensureDir(ORIGIN)
  await ensureDir(dirname(USERS_PATH))
  await ensureDir(dirname(DESTINATION))

  console.log('🚀')

  try {
    const usersImports = await getUsersImports(ORIGIN) ?? []
    const users = await readFromFilePath(USERS_PATH)
    await writeToFilePath(DESTINATION, usersImports.reduce(getReduce(toSet(users)), []).sort(sortByUid))
  } catch (e) {
    handleError(e)

    process.exit(1)
  }

  console.log('👍')
}

export default app()

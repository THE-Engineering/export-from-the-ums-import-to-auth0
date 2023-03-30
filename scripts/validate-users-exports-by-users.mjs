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
} from '#config/validate-users-exports-by-users'
import getUsersExports from '#utils/get-users-exports'
import readFromFilePath from '#utils/read-from-file-path'
import writeToFilePath from '#utils/write-to-file-path'
import hasUserMail from '#utils/has-user-mail'
import getUserMail from '#utils/get-user-mail'
import getUserEmail from '#utils/get-user-email'
import validate from '#utils/validate-users'
import sortByUid from '#utils/sort-by-uid'
import handleError from '#utils/handle-error'

function toSet (users) {
  return (
    new Set(
      users
        .filter(hasUserMail)
        .map((user) => getUserMail(user).toLowerCase())
    )
  )
}

function getReduce (users) {
  return function reduce (accumulator, user) {
    if (!validate(user)) accumulator.push(user)
    else {
      if (!users.has(getUserEmail(user).toLowerCase())) accumulator.push(user)
    }

    return accumulator
  }
}

async function app () {
  await ensureDir(dirname(ORIGIN))
  await ensureDir(dirname(USERS_PATH))
  await ensureDir(dirname(DESTINATION))

  console.log('🚀')

  try {
    const usersExports = await getUsersExports(ORIGIN)
    const users = await readFromFilePath(USERS_PATH)
    await writeToFilePath(DESTINATION, usersExports.reduce(getReduce(toSet(users)), []).sort(sortByUid))

    console.log('👍')
  } catch (e) {
    handleError(e)

    process.exit(1)
  }
}

export default app()

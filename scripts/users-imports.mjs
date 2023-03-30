#!/usr/bin/env node

import {
  ensureDir
} from 'fs-extra'
import {
  ORIGIN,
  DESTINATION,
  USERS_IMPORTS_PATH
} from '#config/users-imports'
import getUsersFilePathList from '#utils/get-users-file-path-list'
import toStatusFilePath from '#utils/to-status-file-path'
import toUsersImportsFilePath from '#utils/to-users-imports-file-path'
import writeToFilePath from '#utils/write-to-file-path'
import TooManyRequestsError, {
  TOO_MANY_REQUESTS
} from '#utils/too-many-requests-error'
import handleError from '#utils/handle-error'
import createJob, {
  genUsers,
  waitForJob
} from '#application/users-imports'

function getStatusCode ({ statusCode } = {}) {
  return statusCode
}

async function app () {
  await ensureDir(ORIGIN)
  await ensureDir(DESTINATION)

  console.log('🚀')

  const filePathList = await getUsersFilePathList(ORIGIN)
  for await (const { users, from, to } of genUsers(filePathList)) {
    console.log(`👉 ${from} - ${to}`)

    try {
      await writeToFilePath(toUsersImportsFilePath(USERS_IMPORTS_PATH, from, to), users)

      const status = await createJob(users)
      await writeToFilePath(toStatusFilePath(DESTINATION, `${from} - ${to}`), status)

      if (getStatusCode(status) === TOO_MANY_REQUESTS) throw new TooManyRequestsError()

      const {
        id
      } = status

      if (id) {
        const status = await waitForJob(id)
        await writeToFilePath(toStatusFilePath(DESTINATION, `${from} - ${to}`), status)
      }

      console.log('👍')
    } catch (e) {
      if (e instanceof TooManyRequestsError) throw e

      handleError(e)

      process.exit(1)
    }
  }
}

export default (
  app()
    .catch((e) => {
      handleError(e)

      process.exit(1)
    })
)

#!/usr/bin/env node

import {
  dirname
} from 'node:path'
import {
  ensureDir
} from 'fs-extra'
import {
  ORIGIN,
  DESTINATION,
  USERS_IMPORTS_PATH
} from '#config/users-imports'
import formatNumber from '#utils/format-number'
import toStatusFilePath from '#utils/to-status-file-path'
import toUsersImportsFilePath from '#utils/to-users-imports-file-path'
import readFromFilePath from '#utils/read-from-file-path'
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
  await ensureDir(dirname(ORIGIN))
  await ensureDir(DESTINATION)

  console.log('🚀')

  const fileData = await readFromFilePath(ORIGIN)
  if (fileData.length) {
    for await (const { users, from, to } of genUsers(fileData)) {
      const fileName = `${formatNumber(from)} - ${formatNumber(to)}`

      console.log(`👉 ${fileName}`)

      try {
        await writeToFilePath(toUsersImportsFilePath(USERS_IMPORTS_PATH, fileName), users)

        const status = await createJob(users)
        await writeToFilePath(toStatusFilePath(DESTINATION, fileName), status)

        if (getStatusCode(status) === TOO_MANY_REQUESTS) throw new TooManyRequestsError()

        const {
          id
        } = status

        if (id) {
          const status = await waitForJob(id)
          await writeToFilePath(toStatusFilePath(DESTINATION, fileName), status)
        }
      } catch (e) {
        if (e instanceof TooManyRequestsError) throw e

        handleError(e)

        process.exit(1)
      }
    }
  }

  console.log('👍')
}

export default (
  app()
    .catch((e) => {
      handleError(e)

      process.exit(1)
    })
)

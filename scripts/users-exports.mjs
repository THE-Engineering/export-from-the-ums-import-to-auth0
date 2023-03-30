#!/usr/bin/env node

import {
  gunzip
} from 'node:zlib'
import {
  ensureDir
} from 'fs-extra'
import {
  DESTINATION,
  USERS_EXPORTS_PATH
} from '#config/users-exports'
import toStatusFilePath from '#utils/to-status-file-path'
import writeToFilePath from '#utils/write-to-file-path'
import handleError from '#utils/handle-error'
import createJob, {
  waitForJob,
  getJobBlob
} from '#application/users-exports'

function gunzipBufferToBuffer (buffer) {
  return (
    new Promise((resolve, reject) => {
      gunzip(buffer, (e, buffer) => {
        (!e)
          ? resolve(buffer)
          : reject(e)
      })
    })
  )
}

async function fromBlobToBuffer (blob) {
  const arrayBuffer = await blob.arrayBuffer()

  return Buffer.from(arrayBuffer)
}

function toUsers (buffer) {
  return (
    buffer.toString('utf8')
      .split(String.fromCodePoint(10))
      .filter(Boolean)
      .map((string) => JSON.parse(string))
  )
}

function getLocation ({ location }) {
  return location
}

async function app () {
  await ensureDir(DESTINATION)

  console.log('🚀')

  try {
    const status = await createJob()
    await writeToFilePath(toStatusFilePath(DESTINATION, 'users-exports'), status)

    const {
      id
    } = status

    if (id) {
      const status = await waitForJob(id)
      await writeToFilePath(toStatusFilePath(DESTINATION, 'users-exports'), status)

      await writeToFilePath(USERS_EXPORTS_PATH, toUsers(
        await gunzipBufferToBuffer(
          await fromBlobToBuffer(
            await getJobBlob(
              getLocation(status)
            )
          )
        )
      ))
    }

    console.log('👍')
  } catch (e) {
    handleError(e)

    process.exit(1)
  }
}

export default app()

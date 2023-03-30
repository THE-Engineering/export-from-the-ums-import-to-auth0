import {
  dirname
} from 'node:path'
import {
  writeFile
} from 'node:fs/promises'
import {
  ensureDir
} from 'fs-extra'
import handleFilePathError from './handle-file-path-error.mjs'

export default async function writeToFilePath (filePath, value) {
  try {
    await ensureDir(dirname(filePath))
    const fileData = JSON.stringify(value, null, 2)
    await writeFile(filePath, fileData, 'utf8')
  } catch (e) {
    handleFilePathError(e)
  }
}

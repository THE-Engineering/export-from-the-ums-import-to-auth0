import {
  dirname
} from 'node:path'
import {
  readFile
} from 'node:fs/promises'
import {
  ensureDir
} from 'fs-extra'
import handleFilePathError from './handle-file-path-error.mjs'

export default async function readFromFilePath (filePath) {
  try {
    await ensureDir(dirname(filePath))
    const fileData = await readFile(filePath, 'utf8')
    return JSON.parse(fileData.toString())
  } catch (e) {
    handleFilePathError(e)
  }
}

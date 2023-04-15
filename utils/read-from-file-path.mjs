import {
  CRYPTO_KEY
} from '#config/crypto'
import {
  dirname
} from 'node:path'
import {
  readFile
} from 'node:fs/promises'
import {
  ensureDir
} from 'fs-extra'
import {
  decrypt
} from './crypto/index.mjs'
import handleFilePathError from './handle-file-path-error.mjs'

export default async function readFromFilePath (filePath) {
  try {
    await ensureDir(dirname(filePath))
    const fileData = await readFile(filePath)
    const buffer = decrypt(fileData, CRYPTO_KEY)
    return JSON.parse(buffer.toString())
  } catch (e) {
    handleFilePathError(e)
  }
}

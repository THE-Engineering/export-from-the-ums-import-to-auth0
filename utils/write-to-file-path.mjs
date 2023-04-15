import {
  CRYPTO_KEY
} from '#config/crypto'
import {
  dirname
} from 'node:path'
import {
  writeFile
} from 'node:fs/promises'
import {
  ensureDir
} from 'fs-extra'
import {
  encrypt
} from './crypto/index.mjs'
import handleFilePathError from './handle-file-path-error.mjs'

export default async function writeToFilePath (filePath, value) {
  try {
    await ensureDir(dirname(filePath))
    const buffer = Buffer.from(JSON.stringify(value, null, 2))
    const fileData = encrypt(buffer, CRYPTO_KEY)
    await writeFile(filePath, fileData)
  } catch (e) {
    handleFilePathError(e)
  }
}

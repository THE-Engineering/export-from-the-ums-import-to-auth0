import {
  dirname,
  join
} from 'node:path'
import getFileName from './get-file-name.mjs'

export default function toUsersFilePath (fromFilePath, toFilePath) {
  const directoryPath = dirname(fromFilePath)
  const fileName = `${getFileName(fromFilePath)} - ${getFileName(toFilePath)}.json`

  return join(
    directoryPath,
    fileName
  )
}

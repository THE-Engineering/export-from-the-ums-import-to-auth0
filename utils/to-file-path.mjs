import {
  basename,
  join
} from 'node:path'

export default function toFilePath (fromFilePath, toDirectoryPath) {
  const fileName = basename(fromFilePath)

  return join(
    toDirectoryPath,
    fileName
  )
}

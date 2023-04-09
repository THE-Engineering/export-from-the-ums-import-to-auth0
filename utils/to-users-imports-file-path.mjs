import {
  join
} from 'node:path'

export default function toUsersImportsFilePath (filePath, fileName) {
  return join(
    filePath,
    fileName + '.json'
  )
}

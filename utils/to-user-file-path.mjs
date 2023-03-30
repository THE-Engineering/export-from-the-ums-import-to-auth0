import {
  join
} from 'node:path'

export default function toUserFilePath (filePath, fileName) {
  return join(
    filePath,
    String(fileName).padStart(7, '0') + '.json'
  )
}

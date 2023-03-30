import {
  join
} from 'node:path'

export default function toStatusFilePath (filePath, fileName) {
  return join(
    filePath,
    fileName + '.json'
  )
}

import {
  join
} from 'node:path'

export default function toUsersImportsFilePath (filePath, from, to) {
  return join(
    filePath,
    `${from} - ${to}.json`
  )
}

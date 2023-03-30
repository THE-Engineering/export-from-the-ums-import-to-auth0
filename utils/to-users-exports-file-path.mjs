import {
  join
} from 'node:path'

export default function toUsersExportsFilePath (filePath) {
  return join(
    filePath,
    'users.json'
  )
}

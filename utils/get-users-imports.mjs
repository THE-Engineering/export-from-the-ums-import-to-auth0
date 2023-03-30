import getUsersImportsFilePathList from './get-users-imports-file-path-list.mjs'
import readFromFilePath from './read-from-file-path.mjs'

export default async function getUsersImports (filePath) {
  const filePathList = await getUsersImportsFilePathList(filePath)
  let usersImports = []

  while (filePathList.length) {
    const filePath = filePathList.shift()
    const users = await readFromFilePath(filePath)
    usersImports = usersImports.concat(users)
  }

  return usersImports
}

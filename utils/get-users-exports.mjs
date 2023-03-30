import readFromFilePath from './read-from-file-path.mjs'

export default async function getUsersExports (filePath) {
  return (
    await readFromFilePath(filePath)
  )
}

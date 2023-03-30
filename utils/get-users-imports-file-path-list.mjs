import {
  join
} from 'node:path'
import glob from 'glob'

export default function getUsersImportsFilePathList (filePath) {
  const pattern = join(filePath, '*[0-9] - *[0-9].json')

  return (
    new Promise((resolve, reject) => {
      glob(pattern, (e, filePathList) => {
        (!e)
          ? resolve(filePathList)
          : reject(e)
      })
    })
  )
}

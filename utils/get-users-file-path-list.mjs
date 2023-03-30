import {
  join
} from 'node:path'
import glob from 'glob'

export default function getUsersFilePathList (directory) {
  const pattern = join(directory, '*.json')

  return (
    new Promise((resolve, reject) => {
      glob(pattern, { ignore: [join(directory, '.users-imports/*'), join(directory, '.users-exports/*')] }, (e, filePathList) => {
        (!e)
          ? resolve(filePathList)
          : reject(e)
      })
    })
  )
}

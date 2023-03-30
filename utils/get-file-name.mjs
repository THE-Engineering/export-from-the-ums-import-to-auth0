import {
  parse
} from 'node:path'

export default function getFileName (filePath) {
  const {
    name
  } = parse(filePath)

  return name
}

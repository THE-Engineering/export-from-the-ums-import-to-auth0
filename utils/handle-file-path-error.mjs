import hasLogError from './has-log-error.mjs'

export default function handleFilePathError (e) {
  const {
    code
  } = e

  if (code !== 'ENOENT') {
    const {
      message
    } = e

    console.error(
      (code)
        ? `💥 ${code} - ${message}`
        : `💥 ${message}`
    )
  }

  if (hasLogError()) console.error(e)
}

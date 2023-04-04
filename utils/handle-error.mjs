import hasLogError from './has-log-error.mjs'

export default function handleError (e) {
  const {
    code,
    message
  } = e

  console.error(
    (code)
      ? `💥 ${code} - ${message}`
      : `💥 ${message}`
  )

  if (hasLogError()) console.error(e)
}

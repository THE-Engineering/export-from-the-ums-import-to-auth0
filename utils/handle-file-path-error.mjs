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
}

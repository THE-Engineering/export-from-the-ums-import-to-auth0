export default function handleError ({
  code,
  message
}) {
  console.error(
    (code)
      ? `💥 ${code} - ${message}`
      : `💥 ${message}`
  )
}

{
  const SIGNALS = [
    'SIGINT',
    'SIGQUIT',
    'SIGTERM'
  ]

  const {
    stdout
  } = process

  SIGNALS
    .forEach((signal) => {
      process.on(signal, () => {
        try {
          stdout.cursorTo(0)
          console.log('👋')
        } catch {
          console.log('✨')
        }

        process.exit()
      })
    })
}

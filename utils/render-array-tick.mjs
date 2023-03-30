const getLastIndex = ({ length = 0 }) => Math.max(length - 1, 0)

const {
  stdout
} = process

function writeTick (index, lastIndex) {
  const l = lastIndex.toString()
  const s = `${index.toString().padStart(l.length, 0)} of ${l}`
  try {
    stdout.cursorTo(0)
    stdout.write(s)
  } catch {
    console.log(s)
  }
}

function writeLastTick (index) {
  const s = index.toString()
  try {
    stdout.clearLine()
    stdout.cursorTo(0)
    stdout.write(s.concat(String.fromCodePoint(10)))
  } catch {
    console.log(s)
  }
}

export default function renderArrayTick (index, array) {
  const lastIndex = getLastIndex(array)

  if (index % 10 === 0 || index === lastIndex) {
    return (
      index !== lastIndex
        ? writeTick(index, lastIndex)
        : writeLastTick(index)
    )
  }
}

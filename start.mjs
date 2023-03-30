import '#config/signals'
import {
  exec
} from 'node:child_process'

const OPTIONS = {
  maxBuffer: 1024 * 2000,
  stdio: 'inherit'
}

const {
  stdout,
  stderr
} = exec('./start.sh', OPTIONS)

stdout.on('data', (v) => {
  console.log(v.trim())
})

stderr.on('data', (v) => {
  console.error(v.trim())
})

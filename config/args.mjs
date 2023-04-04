import 'dotenv/config'
import nconf from 'nconf'

function transform ({ key, value }) {
  if (key === 'log-error' || key === 'logError') {
    return {
      key,
      value: String(value) === 'true'
    }
  }

  return {
    key,
    value
  }
}

export const args = nconf.argv({ transform }).env({ transform }).get()

export default new Map(Object.entries(args))

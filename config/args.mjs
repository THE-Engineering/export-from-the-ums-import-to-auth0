import 'dotenv/config'
import nconf from 'nconf'

function transform ({ key, value }) {
  if (key === 'log-error' || key === 'logError') {
    return {
      key,
      value: String(value) === 'true'
    }
  }

  if (key === 'DATE_CHANGED' || key === 'DATE_CREATED' || key === 'LIMIT') {
    if (typeof value === 'string' && value.length) {
      return {
        key,
        value: Number(value)
      }
    }
  }

  return {
    key,
    value
  }
}

export const args = nconf.argv({ transform }).env({ transform }).get()

export default new Map(Object.entries(args))

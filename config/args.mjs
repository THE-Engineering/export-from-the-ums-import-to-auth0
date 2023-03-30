import 'dotenv/config'
import nconf from 'nconf'

export const args = nconf.argv().env().get()

export default new Map(Object.entries(args))

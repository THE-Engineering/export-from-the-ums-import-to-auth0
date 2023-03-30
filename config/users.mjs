import args from './args.mjs'

import {
  DEFAULT_USERS_PATH
} from './defaults.mjs'

export const DESTINATION = (
  args.has('DESTINATION')
    ? args.get('DESTINATION')
    : DEFAULT_USERS_PATH
)

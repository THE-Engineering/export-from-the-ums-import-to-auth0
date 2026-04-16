import args from './args.mjs'

import {
  DEFAULT_USERS_PATH,
  DEFAULT_AUTH0_PATH
} from './defaults.mjs'

export const ORIGIN = (
  args.has('ORIGIN')
    ? args.get('ORIGIN')
    : DEFAULT_USERS_PATH
)

export const DESTINATION = (
  args.has('DESTINATION')
    ? args.get('DESTINATION')
    : DEFAULT_AUTH0_PATH
)

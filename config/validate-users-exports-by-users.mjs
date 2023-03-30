import args from './args.mjs'

import {
  DEFAULT_USERS_PATH,
  DEFAULT_USERS_EXPORTS_PATH
} from './defaults.mjs'

export const ORIGIN = (
  args.has('ORIGIN')
    ? args.get('ORIGIN')
    : DEFAULT_USERS_EXPORTS_PATH
)

export const DESTINATION = (
  args.has('DESTINATION')
    ? args.get('DESTINATION')
    : '.validate/users-exports-by-users.json'
)

export const USERS_PATH = (
  args.has('USERS_PATH')
    ? args.get('USERS_PATH')
    : DEFAULT_USERS_PATH
)

import args from './args.mjs'

import {
  DEFAULT_USERS_EXPORTS_PATH,
  DEFAULT_USERS_IMPORTS_PATH
} from './defaults.mjs'

export const ORIGIN = (
  args.has('ORIGIN')
    ? args.get('ORIGIN')
    : DEFAULT_USERS_IMPORTS_PATH
)

export const DESTINATION = (
  args.has('DESTINATION')
    ? args.get('DESTINATION')
    : '.validate/users-imports-by-users-exports.json'
)

export const USERS_EXPORTS_PATH = (
  args.has('USERS_EXPORTS_PATH')
    ? args.get('USERS_EXPORTS_PATH')
    : DEFAULT_USERS_EXPORTS_PATH
)

import args from './args.mjs'

import {
  DEFAULT_USERS_PATH,
  DEFAULT_AUTH0_PATH
} from './defaults.mjs'

export const ALGORITHM = (
  args.has('ALGORITHM')
    ? args.get('ALGORITHM')
    : 'pbkdf2-sha512'
)

export const ITERATIONS = (
  args.has('ITERATIONS')
    ? args.get('ITERATIONS')
    : 32768
)

export const KEY_LENGTH = (
  args.has('KEY_LENGTH')
    ? args.get('KEY_LENGTH')
    : 64
)

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

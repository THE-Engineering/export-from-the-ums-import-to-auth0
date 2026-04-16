import args from './args.mjs'
import {
  DEFAULT_USERS_PATH
} from './defaults.mjs'

export const DESTINATION = (
  args.has('DESTINATION')
    ? args.get('DESTINATION')
    : DEFAULT_USERS_PATH
)

export const FAKE_SALT_HASH = (
  args.has('FAKE_SALT_HASH')
    ? args.get('FAKE_SALT_HASH')
    : null
)
export const FAKE_PASS_HASH = (
  args.has('FAKE_PASS_HASH')
    ? args.get('FAKE_PASS_HASH')
    : null
)

export const LIMIT = (
  args.has('LIMIT')
    ? args.get('LIMIT')
    : null
)

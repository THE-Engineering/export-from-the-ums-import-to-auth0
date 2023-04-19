import args from './args.mjs'

import isNumber from './common/is-number.mjs'

import {
  DEFAULT_USERS_PATH
} from './defaults.mjs'

if ((!args.has('DATE_CHANGED')) || !isNumber(args.get('DATE_CHANGED'))) throw new Error('Parameter `DATE_CHANGED` is required')
export const DATE_CHANGED = args.get('DATE_CHANGED')

export const DESTINATION = (
  args.has('DESTINATION')
    ? args.get('DESTINATION')
    : DEFAULT_USERS_PATH
)

export const LIMIT = (
  args.has('LIMIT')
    ? args.get('LIMIT')
    : null
)

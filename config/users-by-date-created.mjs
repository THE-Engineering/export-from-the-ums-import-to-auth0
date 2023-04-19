import args from './args.mjs'

import isNumber from './common/is-number.mjs'

import {
  DEFAULT_USERS_PATH
} from './defaults.mjs'

if ((!args.has('DATE_CREATED')) || !isNumber(args.get('DATE_CREATED'))) throw new Error('Parameter `DATE_CREATED` is required')
export const DATE_CREATED = args.get('DATE_CREATED')

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

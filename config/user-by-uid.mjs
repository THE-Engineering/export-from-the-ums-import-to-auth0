import args from './args.mjs'

import isNumber from './common/is-number.mjs'

import {
  DEFAULT_USERS_PATH
} from './defaults.mjs'

if ((!args.has('DRUPAL_UID')) || !isNumber(args.get('DRUPAL_UID'))) throw new Error('Parameter `DRUPAL_UID` is required')
export const DRUPAL_UID = args.get('DRUPAL_UID')

export const DESTINATION = (
  args.has('DESTINATION')
    ? args.get('DESTINATION')
    : DEFAULT_USERS_PATH
)

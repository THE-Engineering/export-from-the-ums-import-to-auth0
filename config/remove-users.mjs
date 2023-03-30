import args from './args.mjs'

import {
  DEFAULT_AUTH0_PATH
} from './defaults.mjs'

export const ORIGIN = (
  args.has('ORIGIN')
    ? args.get('ORIGIN')
    : DEFAULT_AUTH0_PATH
)

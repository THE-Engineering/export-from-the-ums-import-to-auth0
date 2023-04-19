#!/bin/bash -e

set -a
source .env
set +a

NODE_OPTIONS=--no-warnings node ./scripts/users-exports.mjs

exit 0

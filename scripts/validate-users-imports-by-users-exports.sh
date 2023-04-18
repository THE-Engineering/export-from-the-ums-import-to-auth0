#!/bin/bash -e

set -a
source .env
set +a

node ./scripts/validate-users-imports-by-users-exports.mjs

exit 0

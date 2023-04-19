#!/bin/bash -e

set -a
source .env
set +a

node ./scripts/remove-by-users-exports.mjs

exit 0

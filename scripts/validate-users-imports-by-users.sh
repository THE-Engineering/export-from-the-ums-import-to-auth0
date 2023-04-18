#!/bin/bash -e

set -a
source .env
set +a

node ./scripts/validate-users-imports-by-users.mjs

exit 0

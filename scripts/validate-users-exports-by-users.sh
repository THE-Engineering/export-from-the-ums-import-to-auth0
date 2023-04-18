#!/bin/bash -e

set -a
source .env
set +a

node ./scripts/validate-users-exports-by-users.mjs

exit 0

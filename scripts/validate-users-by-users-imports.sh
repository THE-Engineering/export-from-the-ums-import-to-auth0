#!/bin/bash -e

set -a
source .env
set +a

node ./scripts/validate-users-by-users-imports.mjs

exit 0

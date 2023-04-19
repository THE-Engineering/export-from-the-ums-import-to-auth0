#!/bin/bash -e

set -a
source .env
set +a

node ./scripts/remove-by-users-imports.mjs

exit 0

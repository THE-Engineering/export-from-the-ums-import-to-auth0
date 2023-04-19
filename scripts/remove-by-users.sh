#!/bin/bash -e

set -a
source .env
set +a

node ./scripts/remove-by-users.mjs

exit 0

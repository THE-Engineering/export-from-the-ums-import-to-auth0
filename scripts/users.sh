#!/bin/bash -e

set -a
source .env
set +a

node ./scripts/users.mjs

exit 0

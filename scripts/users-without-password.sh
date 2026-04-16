#!/bin/bash -e

set -a
source .env
set +a

node ./scripts/users-without-password.mjs

exit 0

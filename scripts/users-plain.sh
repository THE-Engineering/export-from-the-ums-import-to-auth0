#!/bin/bash -e

set -a
source .env
set +a

node ./scripts/users-plain.mjs

exit 0

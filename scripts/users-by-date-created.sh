#!/bin/bash -e

set -a
source .env
set +a

node ./scripts/users-by-date-created.mjs \
  --DATE_CREATED $SINCE

exit 0

#!/bin/bash -e

set -a
source .env
set +a

node ./scripts/users-by-date-changed.mjs \
  --DATE_CHANGED $SINCE

exit 0

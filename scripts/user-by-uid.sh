#!/bin/bash -e

set -a
source .env
set +a

node ./scripts/user-by-uid.mjs \
  --DRUPAL_UID

exit 0

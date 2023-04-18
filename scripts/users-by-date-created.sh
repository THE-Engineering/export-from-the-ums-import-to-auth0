#!/bin/bash -e

set -a
source .env
set +a

node ./scripts/users-by-date-created.mjs \
  --MARIADB_USER "$MARIADB_USER"  \
  --MARIADB_PASSWORD "$MARIADB_PASSWORD"  \
  --MARIADB_HOST "$MARIADB_HOST"  \
  --MARIADB_PORT $MARIADB_PORT \
  --MARIADB_DATABASE "$MARIADB_DATABASE"  \
  --DATE_CREATED $SINCE

exit 0

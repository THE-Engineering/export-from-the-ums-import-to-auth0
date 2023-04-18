#!/bin/bash -e

set -a
source .env
set +a

node ./scripts/users.mjs \
  --MARIADB_USER "$MARIADB_USER"  \
  --MARIADB_PASSWORD "$MARIADB_PASSWORD"  \
  --MARIADB_HOST "$MARIADB_HOST"  \
  --MARIADB_PORT $MARIADB_PORT \
  --MARIADB_DATABASE "$MARIADB_DATABASE"

exit 0

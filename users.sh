#!/bin/bash

set -a
source .env
set +a

source ./utils.sh

DEFAULT_USERS_JSON_FILE=./json/users.json

if ! has_mariadb;
then
  echo -e 1>&2 "Required environment variables must be defined (2):"; # "Required environment variables \$MARIADB_USER \$MARIADB_PASSWORD \$MARIADB_HOST \$MARIADB_PORT \$MARIADB_DATABASE must be defined"
  ! has_mariadb_user && \
    echo -e 1>&2 "\033[0;31m • \033[0m\$MARIADB_USER"
  ! has_mariadb_password && \
    echo -e 1>&2 "\033[0;31m • \033[0m\$MARIADB_PASSWORD"
  ! has_mariadb_host && \
    echo -e 1>&2 "\033[0;31m • \033[0m\$MARIADB_HOST"
  ! has_mariadb_port && \
    echo -e 1>&2 "\033[0;31m • \033[0m\$MARIADB_PORT"
  ! has_mariadb_database && \
    echo -e 1>&2 "\033[0;31m • \033[0m\$MARIADB_DATABASE"

  echo 💥
  exit 2
fi

echo Archiving file

archive_file "${USERS_JSON_FILE-$DEFAULT_USERS_JSON_FILE}"

# shellcheck disable=SC2181
if [[ $? == 0 ]];
then
  echo Exporting users from THE UMS

  node ./scripts/users.mjs \
    --MARIADB_USER "$MARIADB_USER" \
    --MARIADB_PASSWORD "$MARIADB_PASSWORD" \
    --MARIADB_HOST "$MARIADB_HOST" \
    --MARIADB_PORT "$MARIADB_PORT" \
    --MARIADB_DATABASE "$MARIADB_DATABASE" \
    --DESTINATION="${USERS_JSON_FILE-$DEFAULT_USERS_JSON_FILE}"

  echo 👋
  exit 0
fi

echo 💥
exit 1

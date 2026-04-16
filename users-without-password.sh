#!/bin/bash

set -a
source .env
set +a

source ./utils.sh

DEFAULT_USERS_JSON_FILE=./json/user.json

echo ✨

if ! has_mariadb;
then
  echo Required environment variables must be defined:
  ! has_mariadb_user && \
  echo -e " \033[0;31m•\033[0m \$MARIADB_USER"
  ! has_mariadb_password && \
  echo -e " \033[0;31m•\033[0m \$MARIADB_PASSWORD"
  ! has_mariadb_host && \
  echo -e " \033[0;31m•\033[0m \$MARIADB_HOST"
  ! has_mariadb_port && \
  echo -e " \033[0;31m•\033[0m \$MARIADB_PORT"
  ! has_mariadb_database && \
  echo -e " \033[0;31m•\033[0m \$MARIADB_DATABASE"

  echo 💥
  exit 2
fi

echo Archiving files

archive;

archive_file "${USERS_JSON_FILE-$DEFAULT_USERS_JSON_FILE}";

# shellcheck disable=SC2181
if [[ $? == 0 ]];
then
  echo Exporting users without password from UMS

  users_without_password;

  echo 👋
  exit 0
fi

echo 💥
exit 1

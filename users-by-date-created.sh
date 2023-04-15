#!/bin/bash

set -a
source .env
set +a

source ./utils.sh

get_args "$@";

trap platform_tunnel_close EXIT

if [[ -z "$DATE_CREATED" ]];
then
  echo Required argument must be defined:
  echo -e " \033[0;31m•\033[0m \$DATE_CREATED"

  echo 💥
  exit 2
fi

DEFAULT_USERS_JSON_FILE=./json/users.json

mkdir .platform 2> /dev/null

echo ✨

platform_tunnel_open;

platform_tunnel_list;

if ! has_mariadb_user;
then
  MARIADB_USER=$(get_mariadb_user)
fi

if ! has_mariadb_password;
then
  MARIADB_PASSWORD=$(get_mariadb_password)
fi

if ! has_mariadb_host;
then
  MARIADB_HOST=$(get_mariadb_host)
fi

if ! has_mariadb_port;
then
  MARIADB_PORT=$(get_mariadb_port)
fi

if ! has_mariadb_database;
then
  MARIADB_DATABASE=$(get_mariadb_database)
fi

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
  echo Exporting users from THE UMS by date created

  users_by_date_created;

  platform_tunnel_close;

  echo 👋
  exit 0
fi

echo 💥
exit 1

#!/bin/bash

set -a
source .env
set +a

source ./utils.sh

get_args "$@";

DEFAULT_USERS_JSON_FILE=./json/users.json
DEFAULT_AUTH0_JSON_FILE=./json/auth0.json

if [[ -f "${USERS_JSON_FILE-$DEFAULT_USERS_JSON_FILE}" ]];
then
  archive_file "${AUTH0_JSON_FILE-$DEFAULT_AUTH0_JSON_FILE}";

  echo Transforming users

  NODE_OPTIONS=--no-warnings node ./scripts/transform-users.mjs \
    --ORIGIN "${USERS_JSON_FILE-$DEFAULT_USERS_JSON_FILE}" \
    --DESTINATION "${AUTH0_JSON_FILE-$DEFAULT_AUTH0_JSON_FILE}"

  # shellcheck disable=SC2181
  if [[ $? == 0 ]];
  then
    echo 👋
    exit 0
  fi
else
  echo 💩
  exit 1
fi

echo 💥
exit 1

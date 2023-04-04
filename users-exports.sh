#!/bin/bash

set -a
source .env
set +a

source ./utils.sh

DEFAULT_STATUS_JSON_DIRECTORY=./json/status
DEFAULT_USERS_EXPORTS_JSON_DIRECTORY=.users-exports

echo ✨

if ! has_auth0;
then
  if ! has_auth0_programmatic_token;
  then
    echo -e 1>&2 "Required environment variables must be defined (2):";
    ! has_auth0_domain && \
    echo -e 1>&2 "\033[0;31m • \033[0m\$AUTH0_DOMAIN"
    ! has_auth0_connection_id && \
    echo -e 1>&2 "\033[0;31m • \033[0m\$AUTH0_CONNECTION_ID"
    ! has_auth0_access_token && \
    echo -e 1>&2 "\033[0;31m • \033[0m\$AUTH0_ACCESS_TOKEN"

    echo 💥
    exit 2
  fi

  if ! has_auth0_manual_token;
  then
    echo -e 1>&2 "Required environment variables must be defined (3):";
    ! has_auth0_domain && \
    echo -e 1>&2 "\033[0;31m • \033[0m\$AUTH0_DOMAIN"
    ! has_auth0_connection_id && \
    echo -e 1>&2 "\033[0;31m • \033[0m\$AUTH0_CONNECTION_ID"
    ! has_auth0_client_id && \
    echo -e 1>&2 "\033[0;31m • \033[0m\$AUTH0_CLIENT_ID"
    ! has_auth0_client_secret && \
    echo -e 1>&2 "\033[0;31m • \033[0m\$AUTH0_CLIENT_SECRET"
    ! has_auth0_audience && \
    echo -e 1>&2 "\033[0;31m • \033[0m\$AUTH0_AUDIENCE"
    ! has_auth0_resource && \
    echo -e 1>&2 "\033[0;31m • \033[0m\$AUTH0_RESOURCE"

    echo 💥
    exit 3
  fi
fi

mkdir \
  "${STATUS_JSON_DIRECTORY-$DEFAULT_STATUS_JSON_DIRECTORY}" \
  "${USERS_EXPORTS_JSON_DIRECTORY-$DEFAULT_USERS_EXPORTS_JSON_DIRECTORY}" 2> /dev/null

echo Archiving files

archive_files "${STATUS_JSON_DIRECTORY-$DEFAULT_STATUS_JSON_DIRECTORY}"
archive_files "${USERS_EXPORTS_JSON_DIRECTORY-$DEFAULT_USERS_EXPORTS_JSON_DIRECTORY}"

# shellcheck disable=SC2181
if [[ $? == 0 ]];
then
  echo Exporting users from Auth0

  NODE_OPTIONS=--no-warnings node ./scripts/users-exports.mjs \
    --AUTH0_DOMAIN "$AUTH0_DOMAIN" \
    --AUTH0_CONNECTION_ID "$AUTH0_CONNECTION_ID" \
    --AUTH0_CLIENT_ID "$AUTH0_CLIENT_ID" \
    --AUTH0_CLIENT_SECRET "$AUTH0_CLIENT_SECRET" \
    --AUTH0_AUDIENCE "$AUTH0_AUDIENCE" \
    --AUTH0_RESOURCE "$AUTH0_RESOURCE"

  echo 👋
  exit 0
fi

echo 💥
exit 1

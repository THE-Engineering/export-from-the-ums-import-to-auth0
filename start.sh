#!/bin/bash -e

set -a
source .env
set +a

source ./utils.sh

get_args "$@";

trap platform_tunnel_close EXIT

START=$EPOCHSECONDS

DEFAULT_USERS_JSON_FILE=./json/users.json
DEFAULT_AUTH0_JSON_FILE=./json/auth0.json
DEFAULT_AUTH0_UPSERT=true
DEFAULT_STATUS_JSON_DIRECTORY=./json/status
DEFAULT_USERS_IMPORTS_JSON_DIRECTORY=.users-imports
DEFAULT_USERS_EXPORTS_JSON_DIRECTORY=.users-exports

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
  echo -e 1>&2 "Required environment variables must be defined (2):";
  ! has_mariadb_user && \
  echo -e 1>&2 " \033[0;31m•\033[0m \$MARIADB_USER"
  ! has_mariadb_password && \
  echo -e 1>&2 " \033[0;31m•\033[0m \$MARIADB_PASSWORD"
  ! has_mariadb_host && \
  echo -e 1>&2 " \033[0;31m•\033[0m \$MARIADB_HOST"
  ! has_mariadb_port && \
  echo -e 1>&2 " \033[0;31m•\033[0m \$MARIADB_PORT"
  ! has_mariadb_database && \
  echo -e 1>&2 " \033[0;31m•\033[0m \$MARIADB_DATABASE"

  echo 💥
  exit 2
fi

echo Archiving file

archive_file "${USERS_JSON_FILE-$DEFAULT_USERS_JSON_FILE}"

# shellcheck disable=SC2181
if [[ $? == 0 ]];
then
  # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
  # Step 1 - Export users                                                     #
  # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

  echo -e 'Exporting users from THE UMS \033[0;90m1\033[0m'

  users;

  platform_tunnel_close;

  # shellcheck disable=SC2181
  if [[ $? == 0 ]];
  then
    if ! has_auth0;
    then
      if ! has_auth0_programmatic_token;
      then
        echo -e 1>&2 "Required environment variables must be defined (2):";
        ! has_auth0_domain && \
        echo -e 1>&2 " \033[0;31m•\033[0m \$AUTH0_DOMAIN"
        ! has_auth0_connection_id && \
        echo -e 1>&2 " \033[0;31m•\033[0m \$AUTH0_CONNECTION_ID"
        ! has_auth0_access_token && \
        echo -e 1>&2 " \033[0;31m•\033[0m \$AUTH0_ACCESS_TOKEN"

        echo 💥
        exit 3
      fi

      if ! has_auth0_manual_token;
      then
        echo -e 1>&2 "Required environment variables must be defined (3):";
        ! has_auth0_domain && \
        echo -e 1>&2 " \033[0;31m•\033[0m \$AUTH0_DOMAIN"
        ! has_auth0_connection_id && \
        echo -e 1>&2 " \033[0;31m•\033[0m \$AUTH0_CONNECTION_ID"
        ! has_auth0_client_id && \
        echo -e 1>&2 " \033[0;31m•\033[0m \$AUTH0_CLIENT_ID"
        ! has_auth0_client_secret && \
        echo -e 1>&2 " \033[0;31m•\033[0m \$AUTH0_CLIENT_SECRET"
        ! has_auth0_audience && \
        echo -e 1>&2 " \033[0;31m•\033[0m \$AUTH0_AUDIENCE"
        ! has_auth0_resource && \
        echo -e 1>&2 " \033[0;31m•\033[0m \$AUTH0_ACCESS_TOKEN_ENDPOINT"

        echo 💥
        exit 4
      fi
    fi

    mkdir \
      "${STATUS_JSON_DIRECTORY-$DEFAULT_STATUS_JSON_DIRECTORY}" \
      "${USERS_IMPORTS_JSON_DIRECTORY-$DEFAULT_USERS_IMPORTS_JSON_DIRECTORY}" \
      "${USERS_EXPORTS_JSON_DIRECTORY-$DEFAULT_USERS_EXPORTS_JSON_DIRECTORY}" 2> /dev/null

    echo Archiving files

    archive_files "${STATUS_JSON_DIRECTORY-$DEFAULT_STATUS_JSON_DIRECTORY}"
    archive_files "${USERS_IMPORTS_JSON_DIRECTORY-$DEFAULT_USERS_IMPORTS_JSON_DIRECTORY}"
    archive_files "${USERS_EXPORTS_JSON_DIRECTORY-$DEFAULT_USERS_EXPORTS_JSON_DIRECTORY}"

    archive_file "${AUTH0_JSON_FILE-$DEFAULT_AUTH0_JSON_FILE}"

    echo -e 'Transforming users \033[0;90m1\033[0m'

    transform_users;

    # shellcheck disable=SC2181
    if [[ $? == 0 ]];
    then
      echo -e 'Importing users to Auth0 \033[0;90m1\033[0m'

      users_imports;

      cp "${USERS_JSON_FILE-$DEFAULT_USERS_JSON_FILE}" ./json/users.users.json

      # shellcheck disable=SC2181
      if [[ $? == 0 ]];
      then
        # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
        # Step 2 (a) - Export users by date changed (since $DATE_CHANGED or $START) #
        # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

        echo -e 'Exporting users from THE UMS \033[0;90m2 (a)\033[0m'

        platform_tunnel_open;

        platform_tunnel_list;

        users_by_date_changed;

        platform_tunnel_close;

        # shellcheck disable=SC2181
        if [[ $? == 0 ]];
        then
          echo -e 'Transforming users \033[0;90m2 (a)\033[0m'

          transform_users;

          # shellcheck disable=SC2181
          if [[ $? == 0 ]];
          then
            echo -e 'Importing users to Auth0 \033[0;90m2 (a)\033[0m'

            users_imports;

            cp "${USERS_JSON_FILE-$DEFAULT_USERS_JSON_FILE}" ./json/users-by-date-changed.users.json
          fi
        fi
      fi

      # shellcheck disable=SC2181
      if [[ $? == 0 ]];
      then
        # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
        # Step 2 (b) - Export users by date created (since $DATE_CREATED or $START) #
        # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

        echo -e 'Exporting users from THE UMS \033[0;90m2 (b)\033[0m'

        platform_tunnel_open;

        platform_tunnel_list;

        users_by_date_created;

        platform_tunnel_close;

        # shellcheck disable=SC2181
        if [[ $? == 0 ]];
        then
          echo -e 'Transforming users \033[0;90m2 (b)\033[0m'

          transform_users;

          # shellcheck disable=SC2181
          if [[ $? == 0 ]];
          then
            echo -e 'Importing users to Auth0 \033[0;90m2 (b)\033[0m'

            users_imports;

            cp "${USERS_JSON_FILE-$DEFAULT_USERS_JSON_FILE}" ./json/users-by-date-created.users.json
          fi
        fi
      fi

      if
        $USERS ||
        $USERS_BY_USERS_IMPORTS ||
        $USERS_BY_USERS_EXPORTS ||
        $USERS_IMPORTS_BY_USERS_EXPORTS ||
        $USERS_EXPORTS_BY_USERS_IMPORTS ||
        $USERS_IMPORTS_BY_USERS ||
        $USERS_EXPORTS_BY_USERS;
      then
        # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
        # Step 3 - Validate                                                         #
        # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

        params=()

        [[ $USERS == true ]] && params+=('-1')
        [[ $USERS_BY_USERS_IMPORTS == true ]] && params+=('-2')
        [[ $USERS_BY_USERS_EXPORTS == true ]] && params+=('-3')
        [[ $USERS_IMPORTS_BY_USERS_EXPORTS == true ]] && params+=('-4')
        [[ $USERS_EXPORTS_BY_USERS_IMPORTS == true ]] && params+=('-5')
        [[ $USERS_IMPORTS_BY_USERS == true ]] && params+=('-6')
        [[ $USERS_EXPORTS_BY_USERS == true ]] && params+=('-7')

        source ./validate.sh "${params[@]}"
      fi

      # shellcheck disable=SC2181
      if [[ $? == 0 ]];
      then
        echo 👋
        exit 0
      fi
    fi
  fi
fi

echo 💥
exit 1

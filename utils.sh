#!/bin/bash

PLATFORM_TUNNEL_OPEN=.platform/tunnel-open.log
PLATFORM_TUNNEL_CLOSE=.platform/tunnel-close.log
PLATFORM_TUNNEL_LIST=.platform/tunnel-list.log

MARIADB="mysql://([a-z0-9]*):([a-z0-9]*)@([a-zA-Z0-9\.\-\_]*):([0-9]*)/([a-zA-Z]*)"

has_args () {
  if [ $# -ge 1 ];
  then
    true
  fi
}

get_args () {
  while [ $# -ge 1 ];
  do
    case "$1" in
      --SINCE)
        export SINCE="$2"
        shift
        ;;
      --DATE_CREATED)
        export DATE_CREATED="$2"
        shift
        ;;
      --DATE_CHANGED)
        export DATE_CHANGED="$2"
        shift
        ;;
      --USERS_JSON_FILE)
        export USERS_JSON_FILE="$2"
        shift
        ;;
      --AUTH0_JSON_FILE)
        export AUTH0_JSON_FILE="$2"
        shift
        ;;
      --STATUS_JSON_DIRECTORY)
        export STATUS_JSON_DIRECTORY="$2"
        shift
        ;;
      --SINCE=*)
        export SINCE="${1#*=}"
        ;;
      --DATE_CREATED=*)
        export DATE_CREATED="${1#*=}"
        ;;
      --DATE_CHANGED=*)
        export DATE_CHANGED="${1#*=}"
        ;;
      --USERS_JSON_FILE=*)
        export USERS_JSON_FILE="${1#*=}"
        ;;
      --AUTH0_JSON_FILE=*)
        export AUTH0_JSON_FILE="${1#*=}"
        ;;
      --STATUS_JSON_DIRECTORY=*)
        export STATUS_JSON_DIRECTORY="${1#*=}"
        ;;
      *)
    esac
    shift
  done
}

users () {
  node ./scripts/users.mjs \
    --MARIADB_USER "$MARIADB_USER" \
    --MARIADB_PASSWORD "$MARIADB_PASSWORD" \
    --MARIADB_HOST "$MARIADB_HOST" \
    --MARIADB_PORT "$MARIADB_PORT" \
    --MARIADB_DATABASE "$MARIADB_DATABASE" \
    --DESTINATION "${USERS_JSON_FILE-$DEFAULT_USERS_JSON_FILE}"
}

users_by_date_changed () {
  node ./scripts/users-by-date-changed.mjs \
    --MARIADB_USER "$MARIADB_USER" \
    --MARIADB_PASSWORD "$MARIADB_PASSWORD" \
    --MARIADB_HOST "$MARIADB_HOST" \
    --MARIADB_PORT "$MARIADB_PORT" \
    --MARIADB_DATABASE "$MARIADB_DATABASE" \
    --DESTINATION "${USERS_JSON_FILE-$DEFAULT_USERS_JSON_FILE}" \
    --DATE_CHANGED "${DATE_CHANGED-$START}"
}

users_by_date_created () {
  node ./scripts/users-by-date-created.mjs \
    --MARIADB_USER "$MARIADB_USER" \
    --MARIADB_PASSWORD "$MARIADB_PASSWORD" \
    --MARIADB_HOST "$MARIADB_HOST" \
    --MARIADB_PORT "$MARIADB_PORT" \
    --MARIADB_DATABASE "$MARIADB_DATABASE" \
    --DESTINATION "${USERS_JSON_FILE-$DEFAULT_USERS_JSON_FILE}" \
    --DATE_CREATED "${DATE_CREATED-$START}"
}

users_imports () {
  NODE_OPTIONS=--no-warnings node ./scripts/users-imports.mjs \
    --AUTH0_DOMAIN "$AUTH0_DOMAIN" \
    --AUTH0_CONNECTION_ID "$AUTH0_CONNECTION_ID" \
    --AUTH0_CLIENT_ID "$AUTH0_CLIENT_ID" \
    --AUTH0_CLIENT_SECRET "$AUTH0_CLIENT_SECRET" \
    --AUTH0_AUDIENCE "$AUTH0_AUDIENCE" \
    --AUTH0_ACCESS_TOKEN_ENDPOINT "$AUTH0_ACCESS_TOKEN_ENDPOINT" \
    --AUTH0_UPSERT "${AUTH0_UPSERT-$DEFAULT_AUTH0_UPSERT}" \
    --ORIGIN "${AUTH0_JSON_FILE-$DEFAULT_AUTH0_JSON_FILE}" \
    --USERS_IMPORTS_PATH "${USERS_IMPORTS_JSON_DIRECTORY-$DEFAULT_USERS_IMPORTS_JSON_DIRECTORY}" \
    --DESTINATION "${STATUS_JSON_DIRECTORY-$DEFAULT_STATUS_JSON_DIRECTORY}"
}

users_exports () {
  NODE_OPTIONS=--no-warnings node ./scripts/users-exports.mjs \
    --AUTH0_DOMAIN "$AUTH0_DOMAIN" \
    --AUTH0_CONNECTION_ID "$AUTH0_CONNECTION_ID" \
    --AUTH0_CLIENT_ID "$AUTH0_CLIENT_ID" \
    --AUTH0_CLIENT_SECRET "$AUTH0_CLIENT_SECRET" \
    --AUTH0_AUDIENCE "$AUTH0_AUDIENCE" \
    --AUTH0_ACCESS_TOKEN_ENDPOINT "$AUTH0_ACCESS_TOKEN_ENDPOINT" \
    --USERS_IMPORTS_PATH "${USERS_EXPORTS_JSON_DIRECTORY-$DEFAULT_USERS_EXPORTS_JSON_DIRECTORY}" \
    --DESTINATION "${STATUS_JSON_DIRECTORY-$DEFAULT_STATUS_JSON_DIRECTORY}"
}

transform_users () {
  NODE_OPTIONS="--no-warnings --max-old-space-size=4096" node ./scripts/transform-users.mjs \
    --ORIGIN "${USERS_JSON_FILE-$DEFAULT_USERS_JSON_FILE}" \
    --DESTINATION "${AUTH0_JSON_FILE-$DEFAULT_AUTH0_JSON_FILE}"
}

platform_tunnel_open () {
  rm "$PLATFORM_TUNNEL_OPEN" 2> /dev/null
  platform tunnel:open --project "$PLATFORM_PROJECT" --environment "$PLATFORM_BRANCH" --no-interaction &> "$PLATFORM_TUNNEL_OPEN"
}

platform_tunnel_close () {
  rm "$PLATFORM_TUNNEL_CLOSE" 2> /dev/null
  platform tunnel:close --no-interaction &> "$PLATFORM_TUNNEL_CLOSE"
}

platform_tunnel_list () {
  rm "$PLATFORM_TUNNEL_LIST" 2> /dev/null
  platform tunnel:list &> "$PLATFORM_TUNNEL_LIST"
}

has_auth0_domain () {
  if [[ -z "$AUTH0_DOMAIN" ]];
  then
    false
  fi
}

has_auth0_connection_id () {
  if [[ -z "$AUTH0_CONNECTION_ID" ]];
  then
    false
  fi
}

has_auth0_client_id () {
  if [[ -z "$AUTH0_CLIENT_ID" ]];
  then
    false
  fi
}

has_auth0_client_secret () {
  if [[ -z "$AUTH0_CLIENT_SECRET" ]];
  then
    false
  fi
}

has_auth0_audience () {
  if [[ -z "$AUTH0_AUDIENCE" ]];
  then
    false
  fi
}

has_auth0_resource () {
  if [[ -z "$AUTH0_ACCESS_TOKEN_ENDPOINT" ]];
  then
    false
  fi
}

has_auth0_access_token () {
  if [[ -z "$AUTH0_ACCESS_TOKEN" ]];
  then
    false
  fi
}

has_auth0_manual_token () {
  if ! has_auth0_domain || ! has_auth0_connection_id || ! has_auth0_access_token;
  then
    false
  fi
}

has_auth0_programmatic_token () {
  if ! has_auth0_domain || ! has_auth0_connection_id || ! has_auth0_client_id || ! has_auth0_client_secret || ! has_auth0_audience || ! has_auth0_resource;
  then
    false
  fi
}

has_auth0 () {
  if ! has_auth0_access_token;
  then
    if ! has_auth0_programmatic_token
    then
      false
    fi
  else
    if ! has_auth0_manual_token;
    then
      false
    fi
  fi
}

has_mariadb_user () {
  if [[ -z "$MARIADB_USER" ]];
  then
    false
  fi
}

get_mariadb_user () {
  [[ "$(<$PLATFORM_TUNNEL_OPEN)" =~ $MARIADB ]] && echo "${BASH_REMATCH[1]}"
}

has_mariadb_password () {
  if [[ -z "$MARIADB_PASSWORD" ]];
  then
    false
  fi
}

get_mariadb_password () {
  [[ "$(<$PLATFORM_TUNNEL_OPEN)" =~ $MARIADB ]] && echo "${BASH_REMATCH[2]}"
}

has_mariadb_host () {
  if [[ -z "$MARIADB_HOST" ]];
  then
    false
  fi
}

get_mariadb_host () {
  [[ "$(<$PLATFORM_TUNNEL_OPEN)" =~ $MARIADB ]] && echo "${BASH_REMATCH[3]}"
}

has_mariadb_port () {
  if [[ -z "$MARIADB_PORT" ]];
  then
    false
  fi
}

get_mariadb_port () {
  [[ "$(<$PLATFORM_TUNNEL_OPEN)" =~ $MARIADB ]] && echo "${BASH_REMATCH[4]}"
}

has_mariadb_database () {
  if [[ -z "$MARIADB_DATABASE" ]];
  then
    false
  fi
}

get_mariadb_database () {
  [[ "$(<$PLATFORM_TUNNEL_OPEN)" =~ $MARIADB ]] && echo "${BASH_REMATCH[5]}"
}

has_mariadb () {
  if ! has_mariadb_user || ! has_mariadb_password || ! has_mariadb_host || ! has_mariadb_port || ! has_mariadb_database;
  then
    false
  fi
}

archive_files () {
  local files_count

  files_count=$(find "$1" -name "*.json" -maxdepth 1 2> /dev/null | wc -l | xargs)

  if [ "$files_count" -gt 0 ];
  then
    local current_date
    local n
    local archive_directory
    local d

    current_date=$(date '+%Y-%m-%d')
    n=1
    archive_directory="$current_date-$n" # archive directory name
    d="$1/$archive_directory"

    while [ -d "$d" ] # while archive directory name exists
    do
      ((n++)) # bash compliant versus n=$((n + 1)) posix compliant increment
      archive_directory="$current_date-$n" # archive directory name
      d="$1/$archive_directory"
    done

    mkdir -p "$d"
    mv "$1"/*.json "$d" 2> /dev/null
  fi
}

archive_file () {
  if [ -f "$1" ];
  then
    local D
    local current_date
    local n
    local archive_directory
    local d

    D=$(dirname "$1")
    current_date=$(date '+%Y-%m-%d')
    n=1
    archive_directory="$current_date-$n" # archive directory name
    d="$D/$archive_directory"

    while [ -d "$d" ] # while archive directory name exists
    do
      ((n++)) # bash compliant versus n=$((n + 1)) posix compliant increment
      archive_directory="$current_date-$n" # archive directory name
      d="$D/$archive_directory"
    done

    mkdir -p "$d"
    mv "$1" "$d" 2> /dev/null
  fi
}

archive () {
  if [ -f "./json/users.users.json" ] || [ -f "./json/users-by-date-changed.users.json" ] || [ -f "./json/users-by-date-created.users.json" ];
  then
    local current_date
    local n
    local archive_directory
    local d

    current_date=$(date '+%Y-%m-%d')
    n=1
    archive_directory="$current_date-$n" # archive directory name
    d="./json/$archive_directory"

    while [ -d "$d" ] # while archive directory name exists
    do
      ((n++)) # bash compliant versus n=$((n + 1)) posix compliant increment
      archive_directory="$current_date-$n" # archive directory name
      d="./json/$archive_directory"
    done

    mkdir -p "$d"
    mv "./json/users.users.json" "$d" 2> /dev/null
    mv "./json/users-by-date-changed.users.json" "$d" 2> /dev/null
    mv "./json/users-by-date-created.users.json" "$d" 2> /dev/null
  fi
}

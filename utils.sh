#!/bin/bash

PLATFORM_TUNNEL_OPEN=.platform/tunnel-open.log
PLATFORM_TUNNEL_CLOSE=.platform/tunnel-close.log
PLATFORM_TUNNEL_LIST=.platform/tunnel-list.log

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
  if [[ -z "$AUTH0_RESOURCE" ]];
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

has_mariadb_password () {
  if [[ -z "$MARIADB_PASSWORD" ]];
  then
    false
  fi
}

get_mariadb_password () {
  [[ "$(<$PLATFORM_TUNNEL_OPEN)" =~ admin:([a-z0-9]*)@ ]] && echo "${BASH_REMATCH[1]}"
}

has_mariadb_host () {
  if [[ -z "$MARIADB_HOST" ]];
  then
    false
  fi
}

has_mariadb_port () {
  if [[ -z "$MARIADB_PORT" ]];
  then
    false
  fi
}

has_mariadb_database () {
  if [[ -z "$MARIADB_DATABASE" ]];
  then
    false
  fi
}

has_mariadb () {
  if ! has_mariadb_user || ! has_mariadb_password || ! has_mariadb_host || ! has_mariadb_port || ! has_mariadb_database;
  then
    false
  fi
}

archive_files () {
  file_count=$(find "$1" -name "*.json" 2> /dev/null | wc -l | xargs)

  if [ "$file_count" -gt 0 ];
  then
    current_date=$(date '+%Y-%m-%d')
    n=1
    archive_directory="$current_date-$n" # archive directory name

    while [ -d "$1/$archive_directory" ] # while archive directory name exists
    do
      ((n++)) # bash compliant versus n=$((n + 1)) posix compliant increment
      archive_directory="$current_date-$n" # archive directory name
    done

    mkdir -p "$1/$archive_directory"
    mv "$1"/*.json "$1/$archive_directory" 2> /dev/null
  fi
}

archive_file () {
  if [ -f "$1" ];
  then
    D=$(dirname "$1")

    current_date=$(date '+%Y-%m-%d')
    n=1
    archive_directory="$current_date-$n" # archive directory name

    while [ -d "$D/$archive_directory" ] # while archive directory name exists
    do
      ((n++)) # bash compliant versus n=$((n + 1)) posix compliant increment
      archive_directory="$current_date-$n" # archive directory name
    done

    mkdir -p "$D/$archive_directory"
    mv "$1" "$D/$archive_directory" 2> /dev/null
  fi
}

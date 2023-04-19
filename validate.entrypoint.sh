#!/bin/bash

set -a
source .env
set +a

source ./utils.sh

START=$(date +%s)

get_args "$@"

DEFAULT_USERS_JSON_FILE=./json/users.json
DEFAULT_AUTH0_JSON_FILE=./json/auth0.json
DEFAULT_STATUS_JSON_DIRECTORY=./json/status
DEFAULT_USERS_IMPORTS_JSON_DIRECTORY=.users-imports
DEFAULT_USERS_EXPORTS_JSON_DIRECTORY=.users-exports

echo ✨

if ! has_git_lfs || ! has_git;
then
  ! has_git_lfs_user && \
  echo -e " \033[0;33m•\033[0m No \033[0;93m\$GIT_LFS_USER\033[0m"
  ! has_git_lfs_personal_access_token && \
  echo -e " \033[0;33m•\033[0m No \033[0;93m\$GIT_LFS_PERSONAL_ACCESS_TOKEN\033[0m"
  ! has_git_lfs_repo && \
  echo -e " \033[0;33m•\033[0m No \033[0;93m\$GIT_LFS_REPO\033[0m"
  ! has_git_user_name && \
  echo -e " \033[0;33m•\033[0m No \033[0;93m\$GIT_USER_NAME\033[0m"
  ! has_git_user_email && \
  echo -e " \033[0;33m•\033[0m No \033[0;93m\$GIT_USER_EMAIL\033[0m"

  echo 👋
  exit 0
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
  mkdir \
    "${STATUS_JSON_DIRECTORY-$DEFAULT_STATUS_JSON_DIRECTORY}" \
    "${USERS_IMPORTS_JSON_DIRECTORY-$DEFAULT_USERS_IMPORTS_JSON_DIRECTORY}" \
    "${USERS_EXPORTS_JSON_DIRECTORY-$DEFAULT_USERS_EXPORTS_JSON_DIRECTORY}" 2> /dev/null

  echo Archiving files

  archive;

  archive_file "${USERS_JSON_FILE-$DEFAULT_USERS_JSON_FILE}";

  archive_files "${STATUS_JSON_DIRECTORY-$DEFAULT_STATUS_JSON_DIRECTORY}";
  archive_files "${USERS_IMPORTS_JSON_DIRECTORY-$DEFAULT_USERS_IMPORTS_JSON_DIRECTORY}";
  archive_files "${USERS_EXPORTS_JSON_DIRECTORY-$DEFAULT_USERS_EXPORTS_JSON_DIRECTORY}";

  archive_file "${AUTH0_JSON_FILE-$DEFAULT_AUTH0_JSON_FILE}";

  # shellcheck disable=SC2181
  if [[ $? == 0 ]];
  then
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    # Users                                                                     #
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

    echo "​"
    echo -e "\033[0;93mUsers\033[0m"
    echo "​"

    echo Exporting users from THE UMS

    users;

    # shellcheck disable=SC2181
    if [[ $? == 0 ]];
    then
      # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
      # Validate                                                                  #
      # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

      echo "​"
      echo -e "\033[0;93mValidate\033[0m"
      echo "​"

      params=()

      [[ $USERS == true ]] && params+=("-1")
      [[ $USERS_BY_USERS_IMPORTS == true ]] && params+=("-2")
      [[ $USERS_BY_USERS_EXPORTS == true ]] && params+=("-3")
      [[ $USERS_IMPORTS_BY_USERS_EXPORTS == true ]] && params+=("-4")
      [[ $USERS_EXPORTS_BY_USERS_IMPORTS == true ]] && params+=("-5")
      [[ $USERS_IMPORTS_BY_USERS == true ]] && params+=("-6")
      [[ $USERS_EXPORTS_BY_USERS == true ]] && params+=("-7")

      source ./validate.sh "${params[@]}"
    fi
  fi
fi


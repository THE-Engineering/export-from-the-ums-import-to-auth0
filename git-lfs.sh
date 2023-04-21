#!/bin/bash

set -a
source .env
set +a

D=$1
S=$2
d=$(mktemp -d)

boom () {
  echo 💥
  exit 1
}

git clone "https://$GIT_USER_ID:$GIT_LFS_PERSONAL_ACCESS_TOKEN@$GIT_LFS_REPOSITORY" "$d/.validate" &> /dev/null

# shellcheck disable=SC2181
if [[ $? == 0 ]];
then
  cd "$d/.validate" || boom;

  git lfs install
  git checkout -b main 2> /dev/null

  # shellcheck disable=SC2181
  if [[ $? != 0 ]];
  then
    git pull
    git checkout main
  fi

  cd "$D/.validate" || boom;

  # shellcheck disable=SC2035
  cp *.json "$d/.validate"

  cd "$d/.validate" || boom;

  git config user.name "$GIT_USER_NAME"
  git config user.email "$GIT_USER_EMAIL"

  # shellcheck disable=SC2086
  message=$(date $S +%F)

  git lfs track "*.json"
  git add .
  git commit -m "$message"
  git push -u origin main

  cd "$D" || boom;
  rm -rf "$d"

  # shellcheck disable=SC2181
  if [[ $? == 0 ]];
  then
    echo 🎉
    exit 0
  fi
fi

boom;

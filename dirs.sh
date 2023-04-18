#!/bin/bash

HARD=false
SOFT=true

has_archive_directory_pattern () {
  [[ "$1" =~ [0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]+ ]]
}

dirs () {
  local current_directory="$1"
  for child in "$current_directory"/*;
  do
    if [ -d "$child" ];
    then
      local directory="$child"
      dirs "$directory"
      if has_archive_directory_pattern "$directory" ;
      then
        rm -rf "$directory"
      fi
    fi
  done
}

for flag in "$@";
do
  shift
  case "$flag" in
    '--hard') set -- "$@" '-h'    ;;
    '--soft') set -- "$@" '-s'    ;;
    *)        set -- "$@" "$flag" ;;
  esac
done

while getopts "h,s" flag;
do
  case "${flag}" in
    h)
      HARD=true
      SOFT=false
      ;;
    s)
      HARD=false
      SOFT=true
      ;;
    *) exit 1;;
  esac
done

if $HARD;
then
  echo ✨
  rm -rf ./json
  rm -rf .users-exports
  rm -rf .users-imports
  rm -rf .validate
  echo 👋
  exit 0
else
  if $SOFT;
  then
    echo ✨
    dirs ./json
    dirs .users-exports
    dirs .users-imports
    dirs .validate
    echo 👋
    exit 0
  else
    echo 💥
    exit 1
  fi
fi

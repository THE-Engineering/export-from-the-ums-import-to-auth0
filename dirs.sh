#!/bin/bash

dirs () {
  echo "$1"
  for f in "$1"/*;
  do
    if [ -d "$f" ];
    then
      dirs "$f"
      if [[ "$f" =~ [0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]+ ]];
      then
        rm -rf "$f"
      fi
    fi
  done
}

echo ✨
dirs ./json
dirs .platform
dirs .users-exports
dirs .users-imports
dirs .validate
echo 👋
exit 0

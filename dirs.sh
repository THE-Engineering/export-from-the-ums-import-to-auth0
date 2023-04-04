#!/bin/bash

has_archive_pattern () {
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
      if has_archive_pattern "$directory" ;
      then
        rm -rf "$directory"
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

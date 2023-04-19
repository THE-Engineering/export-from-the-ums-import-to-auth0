#!/bin/bash -e

set -a
source .env
set +a

NODE_OPTIONS=--no-warnings node ./scripts/transform-users.mjs

exit 0

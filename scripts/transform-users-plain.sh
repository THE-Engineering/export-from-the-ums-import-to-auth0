#!/bin/bash -e

set -a
source .env
set +a

NODE_OPTIONS=--no-warnings node ./scripts/transform-users-plain.mjs

exit 0

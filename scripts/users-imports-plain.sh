#!/bin/bash -e

set -a
source .env
set +a

NODE_OPTIONS=--no-warnings node ./scripts/users-imports-plain.mjs

exit 0

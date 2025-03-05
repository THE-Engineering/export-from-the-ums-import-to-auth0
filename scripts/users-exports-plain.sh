#!/bin/bash -e

set -a
source .env
set +a

NODE_OPTIONS=--no-warnings node ./scripts/users-exports-plain.mjs

exit 0

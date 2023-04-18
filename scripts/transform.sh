#!/bin/bash -e

set -a
source .env
set +a

node ./scripts/transform.mjs

exit 0

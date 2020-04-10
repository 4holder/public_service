#!/bin/bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

docker run --network host --rm -v $DIR/../migrations:/flyway/sql boxfuse/flyway:5.2.4 \
  -url=jdbc:postgresql://$DB_HOST:5432/$DB_NAME \
  -schemas=public \
  -user=$DB_USER \
  -password=$DB_PWD \
  -connectRetries=30 migrate \
  -q
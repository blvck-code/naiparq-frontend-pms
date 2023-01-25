#!/bin/bash

set -e

docker run --rm -v pms_web_portal:/data/ ubuntu /bin/sh -c "rm -rf /data/*"

docker-compose -f docker-compose.yml build
docker-compose -f docker-compose.yml up -d
docker system prune

#!/bin/sh
wait-for ${PGHOST}:${PGPORT} -- npm run migrate up

exec "$@"

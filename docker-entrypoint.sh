#!/bin/sh
wait-for ${PGHOST}:${PGPORT} -- yarn workspace "@openmusic/api" run migrate up
wait-for ${REDIS_SERVER}:${REDIS_PORT}
wait-for ${MAIL_HOST}:${MAILHOG_PORT}
until wget --spider http://guest:guest@rabbitmq:15672/api/aliveness-test/%2F; do echo Waiting for rabbitmq; sleep 5; done;

exec "$@"

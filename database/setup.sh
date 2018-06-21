#!/bin/bash
dropdb 303
dropuser todoapp_dev
createdb 303

BASEDIR=$(dirname $0)

psql 303 < "$BASEDIR/init.sql"

psql 303 -c "GRANT ALL on ALL tables IN SCHEMA public to todoapp_dev"
psql 303 -c "alter user todoapp_dev password 'sample_pass';"

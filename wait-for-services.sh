#!/bin/sh

echo "Waiting for PostgreSQL at $PG_HOST:$PG_PORT..."
until pg_isready -h "$PG_HOST" -p "$PG_PORT" > /dev/null 2>&1; do
  sleep 1
done
echo "PostgreSQL is ready"

echo "Waiting for MSSQL at $MSSQL_HOST:$MSSQL_PORT..."
until nc -z $MSSQL_HOST $MSSQL_PORT; do
  sleep 1
done
echo "MSSQL is ready"

exec "$@"


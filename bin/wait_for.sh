#!/bin/bash
HOST=$1
PORT=$2

echo "Waiting for $HOST:$PORT"

while ! nc -z $HOST $PORT; do
  sleep 0.1
done
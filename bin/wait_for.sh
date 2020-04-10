#!/bin/bash
HOST=$1
PORT=$2

MESSAGE="Waiting for $HOST:$PORT"

echo "$MESSAGE"

while ! nc -z $HOST $PORT; do
  sleep 1
  cat nohup.out
  echo "$MESSAGE"
done
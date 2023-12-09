#!/bin/bash

if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

if [ -z "$TOKEN" ]; then
  echo "TOKEN environment variable is not set."
  exit 1
fi

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 YEAR DAY"
  exit 1
fi

YEAR="$1"
DAY="$2"

DIRECTORY="year/$YEAR/$DAY"
mkdir -p "$DIRECTORY"

curl_output=$(curl -s -H "Cookie: session=$TOKEN" "https://adventofcode.com/$YEAR/day/$DAY/input")
echo -n "$curl_output" > "$DIRECTORY/input.txt"

echo "File saved at: $DIRECTORY/input.txt"
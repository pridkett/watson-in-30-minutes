#!/bin/sh

ENDPOINT=https://credentials.mybluemix.net
CREDENTIALS_FILE=credentials.json
TRAINING_FILE=training.csv

curl --version >/dev/null 2>&1 || { echo >&2 "This script requires curl. You can get it from https://curl.haxx.se/ or your favorite package manager"; exit 1; }

echo "Fetching Credentials..."
curl -X GET $ENDPOINT/credentials -o $CREDENTIALS_FILE

echo "Credentials saved to $CREDENTIALS_FILE"

echo "Fetching Training Data..."
curl -X GET $ENDPOINT/data/training.csv -o $TRAINING_FILE

echo "Training data saved to $TRAINING_FILE"

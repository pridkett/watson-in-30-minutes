#!/bin/sh

TRAINING_FILE=training.csv
CREDENTIALS_FILE=credentials.json
CLASSIFIER_FILE=classifier.json

curl --version >/dev/null 2>&1 || { echo >&2 "This script requires curl. You can get it from https://curl.haxx.se/ or your favorite package manager"; exit 1; }

if [ ! -f $CREDENTIALS_FILE ]; then
    echo "Please make sure that credentials.json exists in the current directory before proceeding"
    echo "You can use getcreds.sh to get a copy of the credentials for this demo"
    exit 1
fi

if [ ! -f $TRAINING_FILE ]; then
    echo "Please make sure that training.csv exists in the current directory before proceeding"
    echo "You can use getcreds.sh to get a simple training file for this demo"
    exit 1
fi

URL=$(grep 'url' $CREDENTIALS_FILE | sed -e 's/[[:space:]]//g' | sed -e 's/^.*url":"//' | sed -e 's/".*$//')
USERNAME=$(grep 'username' $CREDENTIALS_FILE | sed -e 's/[[:space:]]//g' | sed -e 's/^.*username":"//' | sed -e 's/".*$//')
PASSWORD=$(grep 'password' $CREDENTIALS_FILE | sed -e 's/[[:space:]]//g' | sed -e 's/^.*password":"//' | sed -e 's/".*$//')
CLASSIFIER_SERVICE_NAME=$(grep 'username' $CREDENTIALS_FILE | sed -e 's/[[:space:]]//g' | sed -e 's/^.*classifier_name":"//' | sed -e 's/".*$//')
CLASSIFIER_CREDENTIALS_NAME=$(grep 'password' $CREDENTIALS_FILE | sed -e 's/[[:space:]]//g' | sed -e 's/^.*credentials_name":"//' | sed -e 's/".*$//')

if [ -f $CLASSIFIER_FILE ]; then
    echo "You already have a copy of $CLASSIFIER_FILE. This means that most likely you've"
    echo "already run this script and don't need to train another classifier."

    CLASSIFIER_ID=$(grep 'classifier_id' $CLASSIFIER_FILE | sed -e 's/[[:space:]]//g' | sed -e 's/^.*classifier_id":"//' | sed -e 's/".*$//')

    echo ""
    echo "Current Status of Your Classifier: $CLASSIFIER_ID"
    curl -X GET -u "$USERNAME:$PASSWORD" $URL/v1/classifiers/$CLASSIFIER_ID
    exit 1
fi

curl -X POST -u "$USERNAME:$PASSWORD" --form "training_data=@$CREDENTIALS_FILE" --form training_metadata="{\"language\":\"en\",\"name\":\"Interconnect-$CLASSIFIER_SERVICE_NAME-$CLASSIFIER_CREDENTIALS_NAME\"}" $URL/v1/classifiers -o $CLASSIFIER_FILE

echo "The result of your request was:"
cat $CLASSIFIER_FILE

ERROR=$(cat classifier.json  | grep \"error\")

if [ ! -z "$ERROR" ]; then
    echo ""
    echo "There appears to have been an error in your submission. Please check"
    echo "$TRAINING_FILE and try again."
    rm $CLASSIFIER_FILE
fi

'use strict';

var request = require('request');
var fs = require('fs');

try {
  var credentials = require('../credentials.json');
} catch (e) {
  fetchAndSaveCredentials();
}

try {
  var classifier = require('../classifier.json');
} catch (e) {
  if (credentials) {
    displayNoClassifierInformation();
  }
}

function displayNoClassifierInformation() {
  console.error('no classifier information - have you trained a classifier yet?');
  fs.readFile('../training.csv', function readTrainingCallback (err, data) {
    if (err) {
      console.error('can\'t find training.csv - unable to automatically train');
      process.exit(0);
    } else {
      console.error('attempting to automatically train a classifier using training.csv');
      var classifier_name ="Interconnect-" + credentials.classifier_name + '-' + credentials.credentials_name;
      var formData = {
        training_metadata : JSON.stringify({ language : 'en', name: classifier_name }),
        training_data : fs.createReadStream('../training.csv')
      };

      request.post({url : credentials.url + '/v1/classifiers',
                    auth : { user: credentials.username, pass: credentials.password, sendImmediately: true },
                    formData : formData},
        function (err, response, body) {
          if (!err && response.statusCode === 200) {
            fs.writeFile('../classifier.json', body, function writeCredentialsCallback(err) {
              if (err) {
                console.error('error writing classifier.json');
                console.error(err);
                process.exit(1);
              } else {
                console.error('classifier training started - please restart');
                process.exit(0);
              }
            });
          } else {
            console.error(error);
            process.exit(1);
          }
        }
      );
    }
  });
}

function fetchAndSaveCredentials() {
  console.error('no credentials found - downloading them for you');
  request('https://credentials.mybluemix.net/credentials', function(err, response, body) {
    if (!err && response.statusCode == 200) {
      fs.writeFile('../credentials.json', body, function writeCredentialsCallback (err) {
        if (err) {
          console.error('error writing credentials.json');
          console.error(err);
          process.exit(1);
        } else {
          console.error('credentials downloaded - please restart');
          process.exit(0);
        }
      })
    } else {
      console.error(error);
      process.exit(1);
    }
  });
}

function getIndex (request, response) {
  response.writeHead(200, {"Content-Type": 'text/plain'});
  response.end("Hello World!\n");
}

function getClassify (request, response) {
  request(credentials.url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    }
  });
}

module.exports = {
  getIndex : getIndex,
  getClassify : getClassify
};

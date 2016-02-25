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
            console.error(err);
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
          console.error('error writing ../credentials.json');
          console.error(err);
          process.exit(1);
        } else {
          console.error('credentials downloaded and saved to ../credentials.json - please restart');
          process.exit(0);
        }
      })
    } else {
      console.error(err);
      process.exit(1);
    }
  });
}

function getIndex (req, res) {
  res.sendFile('public/index.html', {root : __dirname});
}

function getClassify (req, res) {
  var opts = {
    url : classifier.url + '/classify',
    auth : {user : credentials.username, pass : credentials.password, sendImmediately : true },
    qs : {text : req.query.text}
  };

  request(opts, function (err, response, body) {
    if (err) {
      res.error(err);
    } else {
      if (response.headers['content-type'] === 'application/json') {
        res.json(JSON.parse(body));
      } else {
        console.log('sending whatever...')
        res.send(body);
      }
    }
  });
}

function getStatus (req, res) {
  var opts = {
    url: classifier.url,
    auth : { user: credentials.username, pass: credentials.password, sendImmediately: true }
  };

  request(opts, function (err, response, body) {
    if (err) {
      res.error(err);
    } else {
      if (response.headers['content-type'] === 'application/json') {
        res.json(JSON.parse(body));
      } else {
        console.log('sending whatever...')
        res.send(body);
      }
    }
  });
}

module.exports = {
  getIndex : getIndex,
  getClassify : getClassify,
  getStatus : getStatus
};

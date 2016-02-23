'use strict';

var credentials = require('../credentials.json');
var request = require('request');

function getIndex (request, response) {
  response.writeHead(200, {"Content-Type": 'text/plain'});
  response.end("Hello World!\n");
}

function getClassify (request, response) {
  request(credentials.url 'http://www.google.com', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body) // Show the HTML for the Google homepage.
    }
  })
}

module.exports = {
  getIndex : getIndex,
  getClassify : getClassify
};

'use strict';

var express = require('express'),
    routes = require('./routes'),
    app = express();

var port = process.env.VCAP_APP_PORT || 8080;

app.use('/public', express.static(__dirname + '/public'));


app.get('/classify', routes.getClassify);
app.get('/status', routes.getStatus);
app.get("/", routes.getIndex);

console.log('Now listening on port ' + port);
app.listen(port);

'use strict';

var express = require('express'),
    routes = require('./routes'),
    app = express();

var port = process.env.VCAP_APP_PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.get('/classify', routes.getClassify);
app.get("/", routes.getIndex);

app.listen(port);

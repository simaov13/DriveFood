const express = require('express');
const app = express();
const requireDir = require('require-dir');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = requireDir("./routes");
for (var i in routes) app.use("/api/", routes[i]);

module.exports = app;
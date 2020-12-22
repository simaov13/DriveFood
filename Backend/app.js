const express = require('express');
const app = express();
const requireDir = require('require-dir');
const bodyParser = require('body-parser');
app.use(express.static('public'));
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = requireDir("./routes");
for (var i in routes) app.use("/api/", routes[i]);

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));

module.exports = app;
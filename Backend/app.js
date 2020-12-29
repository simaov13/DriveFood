const express = require('express');
const app = express();
const requireDir = require('require-dir');
const bodyParser = require('body-parser');
app.use(express.static('public'));
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//to solve CORS
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

var routes = requireDir("./routes");
for (var i in routes) app.use("/api/", routes[i]);

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));



module.exports = app;
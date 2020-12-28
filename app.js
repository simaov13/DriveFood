const express = require('express');
const app = express();
const requireDir = require('require-dir');
const bodyParser = require('body-parser');
app.use(express.static('public'));
const port = 3000;

//to solve CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header', 
        'Content-Type, Origin, X-Requested-With, Accept, Authorization'
    );
    
    if (req.method === 'OPTIONS') {
        res.headers('Access-Control-Methods', 'PUT, POST, DELETE, PATCH, GET');
        return res.status(200).send({});
    }

    next();

})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = requireDir("./routes");
for (var i in routes) app.use("/api/", routes[i]);

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));


module.exports = app;
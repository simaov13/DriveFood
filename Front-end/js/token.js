//inicio do ficheiro
const jwt = require("jsonwebtoken");

//rand token
var rand = function() {
    return Math.random().toString(36).substr(2); // remove 0.
};

var token = function() {
    return rand() + rand(); // to make it longer
};

token();


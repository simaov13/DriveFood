//inicio do ficheiro
const jwt = require("jsonwebtoken");
var token = sessionStorage.getItem("tokenSession");

$.ajax({
    url: "http://localhost:3000/api/login",
    type: 'POST',
    cache: false,
    data: {
        username: username,
        password: password,
    },
    success: function (data) {
        console.log(data);
        let token = data.login.token;
        let url = data.login.token;
        sessionStorage.setItem("tokenSession", token);
        token = sessionStorage.getItem("sessionStorage");
        //url da pagina atual
        var urlPage = window.location.href;
        //redireciona para o index.html
        window.location.replace(urlPage + "index.html");
    },
    error: function (jqXHR, textStatus, err) {
        console.log(jqXHR);
        console.log(err, textStatus);
        MSAssertion.toast({ html: 'Error: Erro ao Iniciar Sessão' })
    }

});
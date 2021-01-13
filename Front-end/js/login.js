$("#login").click(function (e) {
    e.preventDefault();
    //dados a enviar, vai buscar os valores dos campos que queremos enviar para a BD
    var dadosajax = {
        username: $("#username").val(),
        password: $("#password").val(),

    };
    if (!verifyPassword() && !verifyUsername()) {
        //nao sei o que é para por aqui
        pageurl = 'http://localhost:3000/api/login';
        //ajax
        $.ajax({
            //url da pagina
            url: pageurl,
            //parametros a passar
            data: dadosajax,
            //tipo: POST ou GET
            type: 'GET',
            //cache
            cache: false,
            //se ocorrer um erro na chamada ajax, retorna este alerta
            //possiveis erros: pagina nao existe, erro de codigo na pagina, falha de comunicacao/internet
            error: function (jqXHR, textStatus, err) {
                alert('Erro: Inserir login!!');
                console.log(jqXHR);
                console.log(err, textStatus);

            },
            data: {
                username: username,
                password: password,
            },
            //retorna o resultado da pagina para onde enviamos os dados
            success: function (data) {
                console.log(data);
                let token = data.login.token;
                let url = data.login.url;
                sessionStorage.setItem("tokenSession", token);
                var url = window.location.href;

            },
            error: function (jqXHR, textStatus, err) {
                alert('Erro: Inserir login!!');
                console.log(jqXHR);
                console.log(err, textStatus);
            }
        });
    }
});

function inserir_login() {
}

//verificar username
function verifyEmail() {
    var email = document.getElementById("username").value;
    //verificar se email está vazio
    if (username == "") {
        document.getElementById("message").innerHTML = "Preencha o email por favor!";
        return true;
    }
    //verificar password
    function verifyPassword() {
        var password = document.getElementById("password").value;
        //verificar se email está vazio
        if (password == "") {
            document.getElementById("message").innerHTML = "Preencha a password por favor!";
            return true;
        }
    }
}
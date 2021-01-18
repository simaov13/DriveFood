function inserir_login() {
}

//verificar username
function verifyUsername() {
    var username = document.getElementById("username").value;
    //verificar se email está vazio
    if (username == "") {
        document.getElementById("message").innerHTML = "Preencha o username por favor!";
        return true;
    }
    else {
        return false;
    }
}
    //verificar password
    function verifyPassword() {
        var password = document.getElementById("password").value;
        //verificar se email está vazio
        if (password == "") {
            document.getElementById("message").innerHTML = "Preencha a password por favor!";
            return true;
        }
        else
         {
             return false;
         }
    }

    //verificar tipo utilizador
    function verifytipoUser() {
        var tipo = $("#tipoUser :selected").val();
        //verificar se o tipoUser está vazio
        if (tipo == "") {
            document.getElementById("message").innerHTML = "Preencha o tipo de utilizador por favor!";
            return true;
        }
        else {
            return false;
        }
    }

$("#login").click(function (e) {
    e.preventDefault();
    //dados a enviar, vai buscar os valores dos campos que queremos enviar para a BD
    var dadosajax = {
        tipo: $("#tipoUser :selected").val(),
        username: $("#username").val(),
        password: $("#password").val(),

    };
    if (verifyPassword() == false && verifyUsername() == false && verifytipoUser() == false) {
        if(dadosajax.tipo == "cliente")
        {
            dadosajax.tipo = "user";
        }
        else if(dadosajax.tipo == "empresa")
        {
            dadosajax.tipo = "merchant";
        }
        else
        {
            dadosajax.tipo = "driver";
        }
        console.log(dadosajax);
        //nao sei o que é para por aqui
        pageurl = 'http://localhost:3000/api/login';
        //ajax
        $.ajax({
            //url da pagina
            url: pageurl,
            //parametros a passar
            data: dadosajax,
            //tipo: POST ou GET
            type: 'POST',
            //cache
            cache: false,
            //retorna o resultado da pagina para onde enviamos os dados
            success: function (data) {
                console.log(data);
                var token = data.user.token;
                sessionStorage.setItem("tokenSession", token);
                window.location='index.html';

            },
            error: function (jqXHR, textStatus, err) {
                alert('Erro: Inserir login!!');
                console.log(jqXHR);
                console.log(err, textStatus);
            }
        });
    }
});
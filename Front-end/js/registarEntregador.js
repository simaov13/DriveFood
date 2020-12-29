$("#validarEntregador").click(function (e) {
    e.preventDefault();
    //dados a enviar, vai buscar os valores dos campos que queremos enviar para a BD
    var dadosajax = {
        username: $("#username").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        password2: $("#password2").val(),
        phone: $("#phone").val(),
        phone_security: $("#phone_security").val(),
        city: $("#city").val(),
        type_license: $("#type_license").val(),
        veihcle: $("#veihcle").val(),
        type: $("#typeUser").val()
    };
    /*
    true = error;
    false = nao da erro;
    */
    if (!verifyPassword() && !verifyUsername() && !verifyEmail() && !matchPassword() && !verifyphone && !verifyphoneSecurity) {
        //nao sei o que é para por aqui
        pageurl = 'http://localhost:4000/api/register';
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
            //se ocorrer um erro na chamada ajax, retorna este alerta
            //possiveis erros: pagina nao existe, erro de codigo na pagina, falha de comunicacao/internet, etc etc etc
            error: function ( jqXHR, textStatus, err) {
                alert('Erro: Inserir Registo!!');
               
                console.log(jqXHR);
                    console.log(err,textStatus);
                
            },
            //retorna o resultado da pagina para onde enviamos os dados
            success: function (result) {
                //se foi inserido com sucesso
                if ($.trim(result) == '1') {
                    alert("O seu registo foi inserido com sucesso!");
                }
                //se foi um erro
                else {
                    alert("Erro: Ocorreu um erro ao inserir o seu registo!");
                }
            }
        });
    }
});

function inserir_registo() {
}
//verificar nome de utilizador
function verifyUsername() {
    var user = document.getElementById("username").value;
    //verificar se username está vazio
    if (user == "") {
        document.getElementById("message").innerHTML = "Preencha o username por favor!";
        return true;
    }

    // validação do comprimento mínimo do username
    if (user.length <= 5) {
        document.getElementById("message").innerHTML = "Username não pode ter menos que 5 caracteres";
        return true;
    }

    //comprimento máximo de validação do username
    if (user.length >= 10) {
        document.getElementById("message").innerHTML = "Username nao pode ultrapassar os 10 caracteres";
        return true;
    } else {
        //alert("username correto");
        return false;
    }
}

//verificar password
function verifyPassword() {
    var pw = document.getElementById("password").value;
    //verificar se password está vazia
    if (pw == "") {
        document.getElementById("message").innerHTML = "Preencha a password por favor!";
        return true;
    }

    // validação do comprimento mínimo da password
    if (pw.length < 8) {
        document.getElementById("message").innerHTML = "Password não pode ter menos que 8 caracteres";
        return true;
    }

    //comprimento máximo de validação da password
    if (pw.length > 15) {
        document.getElementById("message").innerHTML = "Password nao pode ultrapassar os 15 caracteres";
        return true;
    } else {
        return false;
    }
}
//verificar se passwords são iguais 
function matchPassword() {
    var pw1 = document.getElementById("password").value;
    var pw2 = document.getElementById("password2").value;
    if (pw1 !== pw2) {
        console.log(pw1);
        console.log(pw2);
        document.getElementById("message").innerHTML = "As passwords nao coincidem";
        return true;
    } else {
        return false;
    }
}
//verificar email
function verifyEmail() {
    var email = document.getElementById("email").value;
    //verificar se email está vazio
    if (email == "") {
        document.getElementById("message").innerHTML = "Preencha o email por favor!";
        return true;
    }
}
//verificar telefone Segurança
function verifyphoneSecurity() {
    var phone_security = document.getElementById("phone_security").value;
    //verificar se email está vazio
    if (phone_security == "") {
        document.getElementById("message").innerHTML = "Preencha o campo por favor!";
        return true;
    }
}

//verificar telefone 
function verifyphone() {
    var phone = document.getElementById("phone").value;
    //verificar se email está vazio
    if (phone == "") {
        document.getElementById("message").innerHTML = "Preencha o campo por favor!";
        return true;
    }
}
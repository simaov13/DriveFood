
function inserir_registo() {
    //dados a enviar, vai buscar os valores dos campos que queremos enviar para a BD
    var dadosajax = {
        'campo1': $(this).data("username"),
        'campo2': $(this).data("email"),
        'campo3': $(this).data("password"),
        'campo4': $(this).data("password"),
        'campo5': $(this).data("nif"),
        'campo6': $(this).data("adress"),
        'campo7': $(this).data("city"),
        'campo8': $(this).data("postal_code"),
    };
    //nao sei o que é para por aqui
    pageurl = 'register.js';
    //para consultar mais opcoes possiveis numa chamada ajax
    //http://api.jquery.com/jQuery.ajax/
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
        error: function () {
            alert('Erro: Inserir Registo!!');
        },
        //retorna o resultado da pagina para onde enviamos os dados
        success: function (result) {
            //se foi inserido com sucesso
            if ($.trim(result) == '1') {
                alert("O seu registo foi inserido com sucesso!");
            }
            //se foi um erro
            else {
                alert("Ocorreu um erro ao inserir o seu registo!");
            }

        }
    });
}



function verifyPassword() {
    var pw = document.getElementById("password").value;
    //verificar se password está vazia
    if (pw == "") {
        document.getElementById("message").innerHTML = "Preencha a password por favor!";
        return false;
    }

    // validação do comprimento mínimo da password
    if (pw.length < 8) {
        document.getElementById("message").innerHTML = "**Password não pode ter menos que 8 caracteres";
        return false;
    }

    //comprimento máximo de validação da password
    if (pw.length > 15) {
        document.getElementById("message").innerHTML = "**Password nao pode ultrapassar os 15 caracteres";
        return false;
    } else {
        alert("Password correta");
    }
}

function verifyUsername() {
    var user = document.getElementById("usernmae").value;
    //verificar se username está vazio
    if (user == "") {
        document.getElementById("message").innerHTML = "Preencha o username por favor!";
        return false;
    }

    // validação do comprimento mínimo do username
    if (user.length <= 5) {
        document.getElementById("message").innerHTML = "Username não pode ter menos que 5 caracteres";
        return false;
    }

    //comprimento máximo de validação do username
    if (user.length >= 10) {
        document.getElementById("message").innerHTML = "**Username nao pode ultrapassar os 10 caracteres";
        return false;
    } else {
        alert("username correto");
    }
}

//verificar se passwords são iguais 
function matchPassword() {
    var pw1 = document.getElementById("password");
    var pw2 = document.getElementById("password2");
    if (pw1 != pw2) {
        alert("As passwords não coincidem");
    } else {
        alert("Password criada com sucesso");
    }
}
function verifyNif() {
    var nif = document.getElementById("nif").value;
    //verificar nif igual a 9 caracteres
    if (nif != 9) {
        document.getElementById("message").innerHTML = "Só aceitam 9 caracteres";
    }
}

function verifyEmail() {
    var email = document.getElementById("email").value;
    //verificar se email está vazio
    if (pw == "") {
        document.getElementById("message").innerHTML = "Preencha o email por favor!";
        return false;
    }
}
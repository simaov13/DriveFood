$("#validar").click(function (e) {
    e.preventDefault();
    //dados a enviar, vai buscar os valores dos campos que queremos enviar para a BD
    var dadosajax = {
        name: $("#nomerestaurante").val(),
        email: $("#email").val(),
        address: $("#localizacao").val(),
        phone: $("#telefone").val(),
        type_restaurant: $("#tiporestaurante :selected").val(),
        image: $("#imagemrestaurante").val(),
    };
    /*
    true = error;
    false = nao da erro;
    */
    if (verifyName() == false && verifyEmail() == false && verifyPhone() == false) {
        pageurl = "http://localhost:3000/api/restaurante";
        //ajax
        $.ajax({
            //url da pagina
            url: pageurl,
            //tipo: POST ou GET
            type: "POST",
            //parametros a passar
            data: dadosajax,
            headers: { "Authorization": 'Bearer ' + sessionStorage.getItem('tokenSession') },
            //cache
            cache: false,
            //se ocorrer um erro na chamada ajax, retorna este alerta
            //possiveis erros: pagina nao existe, erro de codigo na pagina, falha de comunicacao/internet, etc etc etc
            error: function (jqXHR, textStatus, err) {
                alert("Erro: Inserir Restaurante!");

                console.log(data);
                console.log(jqXHR);
                console.log(err, textStatus);
            },
            //retorna o resultado da pagina para onde enviamos os dados
            success: function (result) {
                //se foi inserido com sucesso
                if ($.trim(result) == "1") {
                    alert("O seu restaurante foi inserido com sucesso!");
                }
                //se foi um erro
                else {
                    //Erro: Ocorreu um erro ao inserir o seu registo!
                    alert("O seu restaurante foi inserido com sucesso!");
                    window.location.href = "index.html";
                }
            },
        });
    }
});

function inserir_registo() {}
//verificar nome produto
function verifyName() {
    var nome = document.getElementById("nomerestaurante").value;
    //verificar se o campo nome do produto está vazio
    if (nome == "") {
        document.getElementById("message").innerHTML = "Preencha o nome do restaurante por favor!";
        return true;
    }
    else
    {
        return false;
    }
}
//verificar email
function verifyEmail() {
    var email = document.getElementById("email").value;
    //verificar se o email está vazio
    if (email == "") {
        document.getElementById("message").innerHTML = "Preencha o email do restaurante por favor!";
        return true;
    }
    else {
        return false;
    }
}
//verificar telemovel
function verifyPhone() {
    var phone = document.getElementById("telefone").value;
    //verificar se o telemovel está vazio
    if (phone == "") {
        document.getElementById("message").innerHTML = "Preencha o número de telefone do restaurante por favor!";
        return true;
    }
    else {
        return false;
    }
}

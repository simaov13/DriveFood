$("#editar").click(function (e) {
    e.preventDefault();
    //dados a enviar, vai buscar os valores dos campos que queremos enviar para a BD
    var dadosajax = {
        name: $("#nomerestaurante").val(),
        email: $("#email").val(),
        phone: $("#phone").val(),
        type_restaurant: $("#tiporestaurante :selected").val(),
        address: $("#address").val(),
        id_restaurante: 5,
    };
    /*
    true = error;
    false = nao da erro;
    */
    if (verifyName() == false && verifyEmail() == false && verifyAddress() == false) {
        pageurl = "http://localhost:3000/api/restaurante/5";
        //ajax
        $.ajax({
            //url da pagina
            url: pageurl,
            //tipo: POST ou GET
            type: "PUT",
            //parametros a passar
            data: dadosajax,
            headers: { "Authorization": 'Bearer ' + sessionStorage.getItem('tokenSession') },
            //cache
            cache: false,
            //se ocorrer um erro na chamada ajax, retorna este alerta
            //possiveis erros: pagina nao existe, erro de codigo na pagina, falha de comunicacao/internet, etc etc etc
            error: function (jqXHR, textStatus, err) {
                alert("Erro: Editar Restaurante!");

                console.log(data);
                console.log(jqXHR);
                console.log(err, textStatus);
            },
            //retorna o resultado da pagina para onde enviamos os dados
            success: function (result) {
                //se foi inserido com sucesso
                if ($.trim(result) == "1") {
                    alert("O seu restaurante foi editado com sucesso!");
                }
                //se foi um erro
                else {
                    //Erro: Ocorreu um erro ao inserir o seu registo!
                    alert("O seu restaurante foi editado com sucesso!");
                    window.location.href = "restaurantes.html";
                }
            },
        });
    }
});

function inserir_registo() {}
//verificar nome restaurante
function verifyName() {
    var nome = document.getElementById("nomerestaurante").value;
    //verificar se o campo nome do restaurante está vazio
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
//verificar preço
function verifyAddress() {
    var address = document.getElementById("address").value;
    //verificar se a morada está vazia
    if (address == "") {
        document.getElementById("message").innerHTML = "Preencha a morada do restaurante por favor!";
        return true;
    }
    else {
        return false;
    }
}

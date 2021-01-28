$("#editar").click(function (e) {
    e.preventDefault();

    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
    
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
    
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    //dados a enviar, vai buscar os valores dos campos que queremos enviar para a BD
    var dadosajax = {
        name: $("#name").val(),
        description: $("#description").val(),
        price: $("#price").val(),
        image: document.getElementById("logo").files[0].name,
    };
    /*
    true = error;
    false = nao da erro;
    */
    if (verifyName() == false && verifyDescription() == false && verifyPrice() == false) {
        pageurl = "http://localhost:3000/api/produto/" + getUrlParameter('id');
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
                alert("Erro: Editar Produto!");

                console.log(data);
                console.log(jqXHR);
                console.log(err, textStatus);
            },
            //retorna o resultado da pagina para onde enviamos os dados
            success: function (result) {
                //se foi inserido com sucesso
                if ($.trim(result) == "1") {
                    alert("O seu produto foi editado com sucesso!");
                }
                //se foi um erro
                else {
                    //Erro: Ocorreu um erro ao inserir o seu registo!
                    alert("O seu produto foi editado com sucesso!");
                    window.location.href = "restaurantes.html";
                }
            },
        });
    }
});

function inserir_registo() {}
//verificar nome produto
function verifyName() {
    var nome = document.getElementById("name").value;
    //verificar se o campo nome do produto está vazio
    if (nome == "") {
        document.getElementById("message").innerHTML = "Preencha o nome do produto por favor!";
        return true;
    }
    else
    {
        return false;
    }
}
//verificar descrição
function verifyDescription() {
    var descricao = document.getElementById("description").value;
    //verificar se a descrição está vazia
    if (descricao == "") {
        document.getElementById("message").innerHTML = "Preencha a descrição do produto por favor!";
        return true;
    }
    else {
        return false;
    }
}
//verificar preço
function verifyPrice() {
    var preco = document.getElementById("price").value;
    //verificar se o preço está vazio
    if (preco == "") {
        document.getElementById("message").innerHTML = "Preencha o preço do produto por favor!";
        return true;
    }
    else {
        return false;
    }
}

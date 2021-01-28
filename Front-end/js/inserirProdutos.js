$("#validar").click(function (e) {
    e.preventDefault();
    //dados a enviar, vai buscar os valores dos campos que queremos enviar para a BD
    var dadosajax = {
        name: $("#nomeproduto").val(),
        description: $("#description").val(),
        price: $("#preco").val(),
        logo: document.getElementById("imagemproduto").files[0].name,
        id_restaurante: 1,
    };
    /*
    true = error;
    false = nao da erro;
    */
    if (verifyName() == false && verifyDescription() == false && verifyPrice() == false) {
        pageurl = "http://localhost:8080/api/produto";
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
                alert("Erro: Inserir Produto!");

                console.log(data);
                console.log(jqXHR);
                console.log(err, textStatus);
            },
            //retorna o resultado da pagina para onde enviamos os dados
            success: function (result) {
                //se foi inserido com sucesso
                if ($.trim(result) == "1") {
                    alert("O seu produto foi inserido com sucesso!");
                }
                //se foi um erro
                else {
                    //Erro: Ocorreu um erro ao inserir o seu registo!
                    alert("O seu produto foi inserido com sucesso!");
                    window.location.href = "index.html";
                }
            },
        });
    }
});

function inserir_registo() {}
//verificar nome produto
function verifyName() {
    var nome = document.getElementById("nomeproduto").value;
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
    var preco = document.getElementById("preco").value;
    //verificar se o preço está vazio
    if (preco == "") {
        document.getElementById("message").innerHTML = "Preencha o preço do produto por favor!";
        return true;
    }
    else {
        return false;
    }
}

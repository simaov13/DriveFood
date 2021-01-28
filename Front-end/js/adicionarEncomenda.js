$("#encomenda").click(function (e) {
    e.preventDefault();
    //dados a enviar, vai buscar os valores dos campos que queremos enviar para a BD
    var dadosajax = {
        id_encomenda: 1,
        id_utilizador: 1,
        id_produto: 6,
        quantity: $("#quantity").val(),
        payment_method: "dinheiro",
        id_restaurante: 7, 
    };
    /*
    true = error;
    false = nao da erro;
    */
        pageurl = "http://localhost:8080/api/encomenda";
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
                alert("Erro: Fazer Encomenda!");

                console.log(data);
                console.log(jqXHR);
                console.log(err, textStatus);
            },
            //retorna o resultado da pagina para onde enviamos os dados
            success: function (result) {
                //se foi inserido com sucesso
                if ($.trim(result) == "1") {
                    alert("A sua encomenda foi feita com sucesso!");
                }
                //se foi um erro
                else {
                    //Erro: Ocorreu um erro ao inserir o seu registo!
                    alert("A sua encomenda foi feita com sucesso!");
                    window.location.href = "index.html";
                }
            },
        });
});
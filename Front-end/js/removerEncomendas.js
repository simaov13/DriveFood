$("#remover").click(function (e) {
    e.preventDefault();
    //dados a enviar, vai buscar os valores dos campos que queremos enviar para a BD
    var dadosajax = {
        id_restaurante: 5, 
    };
    /*
    true = error;
    false = nao da erro;
    */
        pageurl = "http://localhost:8080/api/encomenda/5";
        //ajax
        $.ajax({
            //url da pagina
            url: pageurl,
            //tipo: POST ou GET
            type: "DELETE",
            //parametros a passar
            data: dadosajax,
            headers: { "Authorization": 'Bearer ' + sessionStorage.getItem('tokenSession') },
            //cache
            cache: false,
            //se ocorrer um erro na chamada ajax, retorna este alerta
            //possiveis erros: pagina nao existe, erro de codigo na pagina, falha de comunicacao/internet, etc etc etc
            error: function (jqXHR, textStatus, err) {
                alert("Erro: Eliminar Encomenda!");

                console.log(data);
                console.log(jqXHR);
                console.log(err, textStatus);
            },
            //retorna o resultado da pagina para onde enviamos os dados
            success: function (result) {
                //se foi inserido com sucesso
                if ($.trim(result) == "1") {
                    alert("A sua encomenda foi eliminada com sucesso!");
                }
                //se foi um erro
                else {
                    //Erro: Ocorreu um erro ao inserir o seu registo!
                    alert("A sua encomenda foi eliminada com sucesso!");
                    window.location.href = "indexUtilizador.html";
                }
            },
        });
});
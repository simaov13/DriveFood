$(document).ready(function() {
    $(document).on('click', '.remover', function (e) {
        e.preventDefault();
        console.log(this.id);
        var id = this.id;

        //dados a enviar, vai buscar os valores dos campos que queremos enviar para a BD
        var dadosajax = {
            id_restaurante: id,
        };
        /*
        true = error;
        false = nao da erro;
        */
            pageurl = "http://localhost:8080/api/restaurante/" + dadosajax.id_restaurante;
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
                    alert("Erro: Remover Restaurante!");

                    console.log(data);
                    console.log(jqXHR);
                    console.log(err, textStatus);
                },
                //retorna o resultado da pagina para onde enviamos os dados
                success: function (result) {
                    //se foi removido com sucesso
                    if ($.trim(result) == "1") {
                        alert("O seu restaurante foi removido com sucesso!");
                        window.location.href = "restaurantes.html";
                    }
                    //se foi um erro
                    else {
                        //Erro: Ocorreu um erro ao inserir o seu registo!
                        alert("O seu restaurante foi removido com sucesso!");
                        window.location.href = "restaurantes.html";
                    }
                },
            });
    });
});
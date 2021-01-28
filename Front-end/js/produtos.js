$(document).ready(function () {

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
    pageurl = "http://localhost:8080/api/produtos/" + getUrlParameter('restaurante');
    //ajax
    $.ajax({
        //url da pagina
        url: pageurl,
        //tipo: POST ou GET
        type: "GET",
        //cache
        cache: false,
        //se ocorrer um erro na chamada ajax, retorna este alerta
        //possiveis erros: pagina nao existe, erro de codigo na pagina, falha de comunicacao/internet, etc etc etc
        //retorna o resultado da pagina para onde enviamos os dados
        success: function (result) {
            Escrever(result);
            console.log(result);           
        },
    });

    function Escrever(informacao) {

        console.log(informacao.length);
        if(informacao.length > 0)
        {
            for(var i = 0; i < informacao.length; i++)
            {
                if(i % 3 == 0)
                {
                    var row = document.createElement("div"); 
                    row.className = "row"; 
                }
                              
                let coluna = document.createElement("div");
                coluna.setAttribute("class","col-md");

                let card = document.createElement("div");
                card.setAttribute("class","card");


                let img = document.createElement("img");
                img.setAttribute("class","card-img-top");
                img.src = "./img/" + informacao[i].logo;

                let cardBody = document.createElement("div");
                cardBody.setAttribute("class","card-body");

                let nomeTitulo = document.createElement("h5");
                nomeTitulo.setAttribute("class","card-title");

                var nome = document.createTextNode(informacao[i].name);

                $(nomeTitulo).append(nome);

                let texto = $("<p class=card-text></p>").text(informacao[i].description);

                let preco = $("<p class=card-text></p>").text(informacao[i].price + " €");

                var addpedido = $("<a>Adicionar ao pedido</a>");
                $(addpedido).attr("href", "produtos.html?restaurante=" + informacao[i].id_restaurante);
                $(addpedido).addClass("btn btn-secondary");
                
                $(cardBody).append(nomeTitulo, preco, texto, addpedido);
                if(sessionStorage.getItem('tokenSession') != null)
                {
                    var editar = $("<a></a>");
                    $(editar).attr("href", "editarprodutos.html?id=" + informacao[i].id_produto);
                    $(editar).addClass("editar fa fa-pencil-square-o");

                    var eliminar = $("<a id=" + informacao[i].id_produto + "></a>");
                    $(eliminar).attr("href", "#");
                    $(eliminar).addClass("remover fa fa-times-circle");
                    $(cardBody).append(editar, eliminar);

                }
                $(card).append(img, cardBody);
                $(coluna).append(card);
                row.appendChild(coluna); 
                $("#produtos").append(row); 
            }
        }
        else
        {
            var semResultados = $("<h4></h4>").text("Não foram encontrados resultados para a sua pesquisa!");
            $(".row").append(semResultados);
        }
    }
});
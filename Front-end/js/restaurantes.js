$(document).ready(function () {
    pageurl = "http://localhost:8080/api/restaurantes";
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
                img.src = "./img/" + informacao[i].image;

                let cardBody = document.createElement("div");
                cardBody.setAttribute("class","card-body");

                let nomeTitulo = document.createElement("h5");
                nomeTitulo.setAttribute("class","card-title");

                var nome = document.createTextNode(informacao[i].name);

                $(nomeTitulo).append(nome);

                let texto = $("<p class=card-text></p>").text(informacao[i].address);

                var visitar = $("<a>Visitar</a>");
                $(visitar).attr("href", "produtos.html?restaurante=" + informacao[i].id_restaurante);
                $(visitar).addClass("btn btn-secondary");

                $(cardBody).append(nomeTitulo, texto, visitar);
                if(sessionStorage.getItem('tokenSession') != null)
                {
                    var editar = $("<a></a>");
                    $(editar).attr("href", "editarRestaurantes.html?id=" + informacao[i].id_restaurante);
                    $(editar).addClass("editar fa fa-pencil-square-o");

                    var eliminar = $("<a id=" + informacao[i].id_restaurante + "></a>");
                    $(eliminar).attr("href", "#");
                    $(eliminar).addClass("remover fa fa-times-circle");
                    $(cardBody).append(editar, eliminar);
                }
                $(card).append(img, cardBody);
                $(coluna).append(card);
                row.appendChild(coluna); 
                $("#restaurantes").append(row); 
            }
        }
        else
        {
            var semResultados = $("<h4></h4>").text("Não foram encontrados resultados para a sua pesquisa!");
            $(".row").append(semResultados);
        }
    }
});
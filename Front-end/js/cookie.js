var token = getCookie("tokenSession");

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(name) {
    // Divida a string do cookie e obtenha todos os pares nome = valor individuais em um array
    var cookieArr = document.cookie.split(";");
    
    // Loop através dos elementos do array
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        
        /* Removendo espaços em branco no início do nome do cookie
        e compare-o com a string dada */
        if(name == cookiePair[0].trim()) {
            // Descodifique o valor do cookie e retorne
            return decodeURIComponent(cookiePair[1]);
        }
    }
    
    // Retorna nulo se não for encontrado
    return null;
}

function delCookie(name) {
    document.cookie = name+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

var urlOrigin = getUrlToSubmit();
$.ajax({
    url:'http://localhost:3000/api/login',
    type: 'POST',
    cache: false,
    data:{
        username: username,
        password: password,
    },
    sucess: function (data){
        console.log(data);
        let token = data. login.url;
        setCookie("tokenSession",token,1);
        var urlRedirect = url;
        //redireciona para o index.html
        window.location.replace(urlRedirect + "index.html");
    },
    error : function (jqXHR, textStatus, err){
        console.log(jqXHR);
        console.log(err, textStatus);
        MSAssertion.toast({html: 'Error: Erro ao Iniciar Sessão'})
    }
});
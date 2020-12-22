function verifyPassword() {
    var pw = document.getElementById("password").value;
    //verificar se password está vazia
    if (pw == "") {
        document.getElementById("message").innerHTML = "Preencha a password por favor!";
        return false;
    }

    // validação do comprimento mínimo da password
    if (pw.length < 8) {
        document.getElementById("message").innerHTML = "**Password length must be atleast 8 characters";
        return false;
    }


}  
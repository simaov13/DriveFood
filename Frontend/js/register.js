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

    //comprimento máximo de validação da password
    if (pw.length > 15) {
        document.getElementById("message").innerHTML = "**Password length must not exceed 15 characters";
        return false;
    } else {
        alert("Password is correct");
    }
}  
function verifyNif(){
    var nif = document.getElementById("nif").value;
    //verificar nif igual a 9 caracteres
    if(nif != 9){
        document.getElementById("message").innerHTML = "Só aceitam 9 caracteres";
    }
}
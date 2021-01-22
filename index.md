## DriveFood
Aplicação de Venda de Produtos Alimentares
<br>
-----------------------------------------------------
<br>
<br>
<img align="center" src="drive_food1.jpg" alt="DriveFood" width="200" height="auto">

<h1> REST API - Documentação </h1>

<h2>Rotas</h2>
<ul>
  <li>Admin-route</li>
  <li>Encomenda-route</li>
  <li>Entregas-route</li>
  <li>Login-route</li>
  <li>Product-route</li>
  <li>Register-route</li>
  <li>Restaurante-route</li>
  <li>User-route</li>
</ul>

------------------------------------------------------------

<h2>Controller</h2>
<ul>
  <li>Admin-controller</li>
  <li>Encomenda-controller</li>
  <li>Entregas-controller</li>
  <li>Login-controller</li>
  <li>Product-controller</li>
  <li>Register-controller</li>
  <li>Restaurante-controller</li>
  <li>User-controller</li>
</ul>

------------------------------------------------------------

<h2>Config</h2>
<ul>
    <li>Ficheiro sqlite</li>
</ul>

------------------------------------------------------------

<h2>Db</h2>
<ul>
    <li>Ficheiro drivefood</li>
</ul>

------------------------------------------------------------

<h2>Node_Modules</h2>
<ul>
    <li>Ficheiros node_modules</li>
</ul>

------------------------------------------------------------

<h2>Backend</h2>
<ul>
    <li>Ficheiro app</li>
    <li>Ficheiro package</li>
    <li>Ficheiro package-lock</li>
    <li>Ficheiro gitignore</li>
</ul>

-------------------------------------------------------------
<h1>Login e Register</h1>
<br>
<p>Esta coleção terá os requests relacionados com o iniciar sessão (login) e registar utilizadores (register).<p>

<h1>SuperAdmin</h1>
<br>
<p>As funções dentro desta pasta só podem ser executadas pelos utilizador do tipo "superadmin".
Foi criado apenas um superadmin e será o único a permitir a criação de administradores.</p>

<h2> POST</h2><h2>Login<h2>
<br>
<p>Este request é para iniciar sessão.</p>
<p>Campos obrigatórios:</p>
<ul>
    <li>Username: Nome do Utilizador(Aceita texto)</li>
    <li>Password: Password do Utilizador(Aceita texto)</li>
</ul>
<br>
<p> URL</h2><h2>Criar Utilizador Cliente<p>
<br>
<p>localhost:3000/api/register</p>
<br>
<h3>Body Raw<h3>
<br>
<img align="right" src="login.png" alt="login" width="500" height="auto">

<br />

_____________________________________________

<br />

### / Registar Utilizador tipo Cliente <br /><br />

* **Descrição:**
   `Registar um cliente.`
<br />
* **Método:**
   `POST`
<br />
* **Body [raw]:**   
> - id_utilizador: integer
> - username: text
> - password: text
> - name: text
> - nif: numeric
> - email: text
> - phone: integer
> - address: text
> - city: text
> - postal_code: integer
> - type: text

<br />
* **URl**
   `localhost:3000/api/register` <br />  

* **Sucesso:**

**Status:** `201 CREATED` <br />

```json
{
    "message": "Cliente registado com sucesso",
    "user": {
        "username": "testefinal",
        "name": "testefinal",
        "password": "$2b$10$j2XKXKmlmGGORckBUIOuEu4bFljlo76TWgVyKMSfsXXWRDsm6csAi",
        "nif": 145678270,
        "address": "Rua Principal, IPCA",
        "postal_code": "4775-333",
        "email": "testefinal@testeUser.com",
        "city": "Barcelos",
        "phone": 967845376,
        "type": "user"
    }
}
```
* **Erro** <br />
```
if (err) {
  res.status(500).send(err.message);
  throw err;
} 
```
_____________________________________________

### / Registar Utilizador tipo Condutor <br /><br />
* **Descrição:**
   `Registar um utilizador tipo Condutor.`
<br />
* **Método:**
   `POST`
<br />
* **Body [raw]:**   
> - id_utilizador: integer
> - username: text
> - password: text
> - name: text
> - nif: numeric
> - email: text
> - phone: integer
> - address: text
> - city: text
> - postal_code: integer
> - phone_security: text, 
> - type_license: text,
> - vehicle: text,
> - type: text

<br />
* **URl**
   `localhost:3000/api/register` <br /> 
   **Status:** `201 CREATED` <br />

```json
{
    "message": "Entregador registado com sucesso",
    "user": {
        "username": "testeDriver4",
        "name": "testeDriver4",
        "password": "$2b$10$tCW4PMQA4cyw//GIHeShmO85UzIHDaTWpM06QEG6Fwc.R72iuwuxa",
        "email": "testeDriver4@testeDriver.com",
        "city": "Barcelos",
        "nif": 345209550,
        "address": "Rua Principal, IPCA",
        "phone": 923457863,
        "postal_code": "4775-333",
        "phone_security": 924538023,
        "vehicle": "sim",
        "type_license": "am",
        "type": "driver"
    }
}
```
* **Erro** <br />
```
if (err) {
  res.status(500).send(err.message);
  throw err;
} 
```
___________________________________________

### / Registar Utilizador tipo Empresa <br /><br />
* **Descrição:**
   `Registar um utilizador tipo Empresa.`
<br />
* **Método:**
   `POST`
<br />
* **Body [raw]:**   
> - id_utilizador: integer
> - name: text
> - username: text
> - password: text
> - name: text
> - nif: numeric
> - email: text
> - phone: integer
> - address: text
> - city: text
> - description: integer
> - logo: text, 
> - type: text

<br />
* **URl**
   `localhost:3000/api/register` <br /> 
   **Status:** `201 CREATED` <br />
```json
{
    "message": "Empresa registada com sucesso",
    "user": {
        "username": "testeMerchant4",
        "name": "testeMerchant4",
        "email": "testeMerchante4@testeMerchant.com",
        "password": "$2b$10$VUIC7jmrKlcEd.tyr2pQ.eTw0ax3MtzuzD.bfwPkoeNvS5PqSbMRm",
        "address": "Rua Principal, IPCA",
        "postal_code": "4775-333",
        "city": "Barcelos",
        "nif": 234890514,
        "phone": 913457819,
        "description": "Esta e uma empresa Macdonald",
        "type": "merchant"
    }
}
```
* **Erro** <br />
```
if (err) {
  res.status(500).send(err.message);
  throw err;
} 
```

___________________________________________

### / Registar Utilizador tipo Administrador <br /><br />
* **Descrição:**
   `Registar um utilizador tipo Administrador.`
<br />
* **Método:**
   `POST`
<br />
* **Body [raw]:**   
> - id_utilizador: integer
> - name: text
> - username: text
> - password: text
> - name: text
> - nif: numeric
> - email: text
> - phone: integer
> - address: text
> - city: text
> - type: text

<br />
* **URl**
   `localhost:3000/api/register` <br /> 
   **Status:** `201 CREATED` <br />

```json
   {
    "message": "Administrador registado com sucesso",
    "user": {
        "username": "testeAdmin4",
        "name": "testeAdmin4",
        "password": "$2b$10$fMB.FcIYv/oBVVfB3nWgjuWKcKNvMOl3vS/xAlSJIOjkCZQ0SgUQK",
        "nif": 348167094,
        "address": "Rua Principal, IPCA",
        "postal_code": "4775-333",
        "email": "testeAdmin4@testeAdmin.com",
        "city": "Barcelos",
        "phone": 916381507,
        "type": "admin"
    }
}
```  
  * **Erro** <br />
```
if (err) {
  res.status(500).send(err.message);
  throw err;
} 
```
* **Verificação Token ** <br />
```
    //verificar se existe token
    const tokenUnsplited = req.headers.authorization;
    if (tokenUnsplited) {
    //token
    const token = req.headers.authorization.split(' ')[1];
    var decoded = jwt.verify(token, 'Token');
    //se ele for diferente merchant dá erro, se nao executa
    var id_utilizador = req.params.id_utilizador;
    //verificar o tipo de utilizador
    if (decoded.type != "superadmin") {
    let response = {
        message: "failed",
        request: {
         type: 'GET',
         description: 'Obter Informação da Empresa'
                  }
       }
       //error
       res.status(400).send(response);
    }
```
___________________________________________

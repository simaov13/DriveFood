## DriveFood
Aplicação de Venda de Produtos Alimentares
<br />
-----------------------------------------------------
<br />
<br />
<img align="center" src="drive_food1.png" alt="DriveFood" width="200" height="auto">

### REST API - Documentação 

### Quem somos?

DriveFood é uma empresa criada para entrega de produtos alimentares de modo a que as pessoas não tenham de sair de casa. O nosso objetivo é crescer a empresa a nivel nacional e conseguir entregar em todas as casas os produtos alimentares.

### Rotas
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

 ### Controller
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

### Config
<ul>
    <li>Ficheiro sqlite</li>
</ul>

------------------------------------------------------------

### Db
<ul>
    <li>Ficheiro drivefood</li>
</ul>

------------------------------------------------------------

### Node_Modules
<ul>
    <li>Ficheiros node_modules</li>
</ul>

------------------------------------------------------------

### Backend
<ul>
    <li>Ficheiro app</li>
    <li>Ficheiro package</li>
    <li>Ficheiro package-lock</li>
    <li>Ficheiro gitignore</li>
</ul>

-------------------------------------------------------------

## Login e Register
<br />
Esta coleção terá os requests relacionados com o iniciar sessão (login) e registar utilizadores (register).
Comentario 2021

## SuperAdmin
<br />
As funções dentro desta pasta só podem ser executadas pelos utilizador do tipo "superadmin".
Foi criado apenas um superadmin e será o único a permitir a criação de administradores.

## POST Login
<br>
Este request é para iniciar sessão
Campos obrigatórios:
<ul>
    Username: Nome do Utilizador(Aceita texto) <br />
    Password: Password do Utilizador(Aceita texto) <br />
</ul>
<br />

Body Raw <br /><br />
_____________________________________________________
<br />

### Registar Utilizador tipo Cliente <br /><br />
**Descrição:**
   `Registar um cliente.`
<br />
 **Método:**
   `POST`
<br />
 **Body [raw]:** 
 
- [x]  id_utilizador: integer
- [x]  username: text
- [x]  password: text
- [x]  name: text
- [x]  nif: numeric
- [x]  email: text
- [x]  phone: integer
- [x]  address: text
- [x]  city: text
- [x]  postal_code: integer
- [x]  type: text

<br />


   **URl** <br />
   localhost:3000/api/register <br /> 
   **Status:** `201 CREATED` <br />
 
 **Resposta:** <br />

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

### Registar Utilizador tipo Condutor <br /><br />
**Descrição:**
   `Registar um utilizador tipo Condutor.`
<br />
 **Método:**
   `POST`
<br />

 **Body [raw]:** 

- [x]  id_utilizador: integer
- [x]  username: text
- [x]  password: text
- [x]  name: text
- [x]  nif: numeric
- [x]  email: text
- [x]  phone: integer
- [x]  address: text
- [x]  city: text
- [x]  postal_code: integer
- [x]  phone_security: text, 
- [x]  type_license: text,
- [x]  vehicle: text,
- [x]  type: text

<br />
   **URl** <br />
   localhost:3000/api/register <br /> 
   **Status:** `201 CREATED` <br />
   
**Resposta:** <br />

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
**Erro** <br />
```
if (err) {
  res.status(500).send(err.message);
  throw err;
} 
```
___________________________________________

###  Registar Utilizador tipo Empresa <br /><br />

 **Descrição:**
   `Registar um utilizador tipo Empresa.`
<br />

 **Método:**
   `POST`
<br />

 **Body [raw]:**
 
<br />

- [x]  id_utilizador: integer  <br />
- [x]  name: text 
- [x]  username: text 
- [x]  password: text 
- [x]  name: text
- [x]  nif: numeric
- [x]  email: text
- [x]  phone: integer
- [x]  address: text
- [x]  city: text
- [x]  description: integer
- [x]  logo: text, 
- [x]  type: text

<br />

   **URl** <br />
   localhost:3000/api/register <br /> 
   **Status:** `201 CREATED` <br />
   
**Resposta:** <br />

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
 **Erro** <br />
```
if (err) {
  res.status(500).send(err.message);
  throw err;
} 
```

___________________________________________

### Registar Utilizador tipo Administrador <br /><br />

 **Descrição:**
   `Registar um utilizador tipo Administrador.`
<br />

**Método:**
   `POST`
<br />

**Body [raw]:**   
<ul>
  
- [x]  id_utilizador: integer
- [x]  name: text
- [x]  username: text
- [x]  password: text
- [x]  name: text
- [x]  nif: numeric
- [x]  email: text
- [x]  phone: integer
- [x]  address: text
- [x]  city: text
- [x]  type: text

</ul>

<br />

 **URl** <br />
   localhost:3000/api/register <br /> 
   **Status:** `201 CREATED` <br />

**Resposta:** <br />

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
**Erro** <br />
```
if (err) {
  res.status(500).send(err.message);
  throw err;
} 
```
### Verificação Token  <br />
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

###  Login de um Utilizador <br /><br />
 **Descrição:**
   `Login de um utilizador.`
<br />

 **Campos Obrigatórios:**
   <ul>
    Username: Nome do Utilizador(Aceita texto) <br />
    Password: Password do Utilizador(Aceita texto) <br />
</ul>
<br />
 **Método:**
   `POST`
<br />

 **Body [raw]:**
 
 <ul>
  
- [x] username : text, <br />
- [x] password : text <br /> 

</ul>

<br />

 **URl** <br />
   localhost:3000/api/login <br /> 
   **Status:** `200` <br />
   
  ```
  {
    "username":"admin",
    "password":"passteste"
  }
  ```
  <br />
  
  **Resposta:** <br />
  
  ```json
  {
    "message": "Autenticado com sucesso",
    "user": {
        "type": "admin",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNjExMzU3NzA1LCJleHAiOjE2MTE0NDQxMDV9.G1UHQNjr6qK3T73NE57jxrvHjD2SGimzHkr1rldrgJc"
    }
}
``` 
___________________________________________

  ###  Criar, Editar e Eliminar um restaurante <br /><br />
  ### Criar um restaurante
 **Descrição:**
   `O Utilizador Empresa terá de fazer login, em seguida, atraves do token é possivel a criação, a edição e a eliminação de um restaurante.`
<br />
 **Campos Obrigatórios:**
<ul>
- [x] name : text, <br />
- [x] password : text <br /> 
- [x] phone : integer <br /> 
- [x] email : text <br /> 
- [x] type_restaurant : text <br /> 
</ul>

<br />

 **Método:**
   `POST`
<br />

 **Body [raw]:**
 
 **URl** <br />
   localhost:3000/api/restaurante <br /> 
   **Status:** `Create 201` <br />
   
  ```
{
    "name":"Pizzaria Italiana",
    "address":"Rua do entroncamento",
    "phone": 253456779,
    "email":"pizzariaitaliana1@gmail.com",
    "type_restaurant":"Pizaria"                         
}

  ```
  <br />
  
**Resposta:** <br />
  
```json

{
    "message": "Restaurante adicionado com sucesso",
    "user": {
        "name": "Pizzaria Italiana",
        "address": "Rua do entroncamento",
        "phone": 253456779,
        "email": "pizzariaitaliana1@gmail.com",
        "type_restaurant": "Pizaria"
    }
}

``` 
_______________________________________________________

 ### Editar um restaurante
 **Descrição:**
   `O Utilizador Empresa terá de fazer login, em seguida, atraves do token é possivel a criação, a edição e a eliminação de um restaurante.
    É necessário apenas o id do restaurante`
<br />
 **Campos Obrigatórios:**
<ul>
- [x] name : text, <br />
- [x] password : text <br /> 
- [x] phone : integer <br /> 
- [x] email : text <br /> 
- [x] type_restaurant : text <br /> 
</ul>

<br />

 **Método:**
   `PUT`
<br />

 **Body [raw]:**
 
 **URl** <br />
   localhost:3000/api/restaurante/:id_restaurante <br /> 
   **Status:** `200` <br />
   
  ```
{
    "name":"Pizzaria Italiana",
    "address":"Rua do entroncamento",
    "phone": 253456779,
    "email":"pizzariaitaliana1@gmail.com",
    "type_restaurant":"Pizaria"                         
}

  ```
  <br />
  
**Resposta:** <br />
  
```json

{
    "message": "Restaurante editado com sucesso",
    "user": {
        "name": "Pizzaria Miki",
        "address": "Rua do entroncamento",
        "phone": 253456749,
        "email": "pizzariamiki@gmail.com",
        "type_restaurant": "Pizaria"
    }
}

``` 


_______________________________________________________

 #### Eliminar um restaurante
 
 **Descrição:**
   `O Utilizador Empresa terá de fazer login, em seguida, atraves do token é possivel a criação, a edição e a eliminação de um restaurante.
    É necessário apenas o id do restaurante`
<br />

 **Campos Obrigatórios:**
<ul>
- [x] name : text, <br />
- [x] password : text <br /> 
- [x] phone : integer <br /> 
- [x] email : text <br /> 
- [x] type_restaurant : text <br /> 
</ul>

<br />

 **Método:**
   `DELETE`
<br />

 **Body [raw]:**
 
 **URl** <br />
   localhost:3000/api/restaurante/:id_restaurante <br /> 
   **Status:** `204` <br />
   
  ```
{
    "name":"Pizzaria Italiana",
    "address":"Rua do entroncamento",
    "phone": 253456779,
    "email":"pizzariaitaliana1@gmail.com",
    "type_restaurant":"Pizaria"                         
}

  ```
  <br />
  
**Resposta:** <br />
  
```json

{
    "message": "Restaurante eliminado com sucesso"
}

``` 











___________________________________________

  ###  Criar, Editar e Eliminar um Produto num Restaurante <br /><br />
  ###  Criar um Produto
 **Descrição:**
   `O Utilizador Empresa terá de fazer login, em seguida, atraves do token é possivel a criação, a edição e a eliminação de um produto.`
<br />
 **Campos Obrigatórios:**
<ul>
- [x] name : text, <br />
- [x] description : text <br /> 
- [x] price : integer <br /> 
- [x] id_restaurante : integer <br /> 
</ul>

<br />

 **Método:**
   `POST`
<br />

 **Body [raw]:**
 
 **URl** <br />
   localhost:3000/api/produto <br /> 
   **Status:** `Create 201` <br />
   
  ```
{
    "name":"Francesinha",
    "description":"Molho especial da casa",
    "price":10,
    "id_restaurante":2
}

  ```
  <br />
  
**Resposta:** <br />
  
```json

{
    "message": "Produto criado com sucesso!",
    "product": {
        "name": "Francesinha",
        "description": "Molho especial da casa",
        "logo": 10,
        "price": 10,
        "id_restaurante": 2
    }
}

``` 
_______________________________________________________

 ### Editar um produto 
 **Descrição:**
   `O Utilizador Empresa terá de fazer login, em seguida, atraves do token é possivel a criação, a edição e a eliminação de um produto.
    É necessário apenas o id do produto`
<br />
 **Campos Obrigatórios:**
<ul>
- [x] name : text, <br />
- [x] description : text <br /> 
- [x] price : integer <br /> 
- [x] id_restaurante : integer <br /> 
</ul>

<br />

 **Método:**
   `PUT`
<br />

 **Body [raw]:**
 
 **URl** <br />
   localhost:3000/api/produto/:id_produto <br /> 
   **Status:** `201` <br />
   
  ```
{
    "name":"Francesinha de Alheira",
    "description":"Molho especial da casa",
    "price":7,
    "id_restaurante":2
}

  ```
  <br />
  
**Resposta:** <br />
  
```json

{
    "message": "Produto editado com sucesso!",
    "product": {
        "id_produto": "10",
        "name": "Francesinha de Alheira",
        "description": "Molho especial da casa",
        "logo": 7,
        "price": 7,
        "id_restaurante": 2
    }
}

``` 


_______________________________________________________

 ### Eliminar um produto <br />
 
 **Descrição:**
   `O Utilizador Empresa terá de fazer login, em seguida, atraves do token é possivel a criação, a edição e a eliminação de um produto.
    É necessário apenas o id do produto`
<br />

 **Campos Obrigatórios:**
<ul>
- [x] name : text, <br />
- [x] description : text <br /> 
- [x] price : integer <br /> 
- [x] id_restaurante : integer <br /> 
</ul>

<br />

 **Método:**
   `DELETE`
<br />

 **Body [raw]:**
 
 **URl** <br />
   localhost:3000/api/produto/:id_produto <br /> 
   **Status:** `204` <br />
   
  ```
{
    "name":"Pizzaria Italiana",
    "address":"Rua do entroncamento",
    "phone": 253456779,
    "email":"pizzariaitaliana1@gmail.com",
    "type_restaurant":"Pizaria"                         
}

  ```
  <br />
  
**Resposta:** <br />
  
```json

{
    "message": "Produto eliminado com sucesso"
}

``` 

**Erro** <br />

```json

{
    "message": "Produto não encontrado"
}

``` 





___________________________________________

  ###  Criar, Editar e Eliminar uma Encomenda <br /><br />
  #### Criar uma Entrega <br />
 **Descrição:**
   `O Utilizador Tipo Cliente ou Administrador terá de fazer login, em seguida, atraves do token é possivel a criação, a edição e a eliminação de uma encomenda.`
<br />
 **Campos Obrigatórios:**
<ul>
- [x] id_produto : integer, <br />
- [x] quantity : integer <br /> 
- [x] id_restaurante : integer <br /> 
- [x] payment_method : text <br /> 
</ul>

<br />

 **Método:**
   `POST`
<br />

 **Body [raw]:**
 
 **URl** <br />
   localhost:3000/api/encomenda <br /> 
   **Status:** `Create 201` <br />
   
  ```
{
    "id_produto": 1,
    "quantity":6,
    "id_restaurante":1,
    "payment_method":"mbway"
   
}

  ```
  <br />
  
**Resposta:** <br />
  
```json

{
    "message": "Encomenda criada com sucesso!",
    "user": {
        "id_produto": 1,
        "quantity": 6,
        "id_restaurante": 1,
        "payment_method": "mbway"
    }
}

``` 
_______________________________________________________

 ### Editar uma Encomenda
 **Descrição:**
   `O Utilizador tipo CLiente e Administrador terá de fazer login, em seguida, atraves do token é possivel a criação, a edição e a eliminação de uma encomenda.
    É necessário apenas o id da encomenda`
<br />
 **Campos Obrigatórios:**
<ul>
- [x] id_produto : integer, <br />
- [x] quantity : integer <br /> 
- [x] id_restaurante : integer <br /> 
- [x] payment_method : text <br /> 
</ul>

<br />

 **Método:**
   `PUT`
<br />

 **Body [raw]:**
 
 **URl** <br />
   localhost:3000/api/encomenda/:id_encomenda <br /> 
   **Status:** `200` <br />
   
  ```
{
    "id_produto": 1,
    "quantity":3,
    "id_restaurante":1,
    "payment_method":"mbway"
   
}

  ```
  <br />
  
**Resposta:** <br />
  
```json

{
    "message": "Encomenda editada com sucesso!",
    "encomenda": {
        "id_encomenda": "4",
        "id_produto": 1,
        "quantity": 3,
        "id_restaurante": 1,
        "payment_method": "mbway"
    }
}

``` 


_______________________________________________________

 ### Eliminar uma Encomenda
 
 **Descrição:**
   `O Utilizador Tipo Cliente e Administrador terá de fazer login, em seguida, atraves do token é possivel a criação, a edição e a eliminação de uma encomenda.
    É necessário apenas o id da encomenda`
<br />

 **Campos Obrigatórios:**
<ul>
- [x] id_produto : integer, <br />
- [x] quantity : integer <br /> 
- [x] id_restaurante : integer <br /> 
- [x] payment_method : text <br /> 
</ul>

<br />

 **Método:**
   `DELETE`
<br />

 **Body [raw]:**
 
 **URl** <br />
   localhost:3000/api/encomenda/:id_encomenda <br /> 
   **Status:** `204` <br />
  <br />
  
**Resposta:** <br />
  
```json

{
    "message": "Encomenda eliminada com sucesso"
}

``` 

 
___________________________________________

  ### Criar, Eliminar uma Entrega <br /><br />
  ### Criar uma Entrega
 **Descrição:**
   `O Utilizador Tipo Cliente ou Administrador terá de fazer login, em seguida, atraves do token é possivel a criação, a edição e a eliminação de uma entrega.`
<br />
 **Campos Obrigatórios:**
<ul>
- [x] id_entrega : integer, <br />
- [x] id_encomenda : integer <br /> 
- [x] id_utilizador : integer <br /> 
</ul>

<br />

 **Método:**
   `POST`
<br />

 **Body [raw]:**
 
 **URl** <br />
   localhost:3000/api/entrega <br /> 
   **Status:** `Create 201` <br />
   
  ```
{
    "id_encomenda": 2,
    "id_utilizador":26
}

  ```
  <br />
  
**Resposta:** <br />
  
```json

{
    "message": "Entrega criada com sucesso!",
    "user": {
        "id_encomenda": 2,
        "id_utilizador": 26
    }
}

``` 
_______________________________________________________

 ### Eliminar uma entrega
 
 **Descrição:**
   `O Utilizador Tipo Cliente e Administrador terá de fazer login, em seguida, atraves do token é possivel a criação e a eliminação de uma entrega.
    É necessário apenas o id da entrega`
<br />

 **Campos Obrigatórios:**
<ul>
- [x] id_entrega : integer, <br />
- [x] id_encomenda : integer <br /> 
- [x] id_utilizador : integer <br /> 
</ul>

<br />

 **Método:**
   `DELETE`
<br />

 **Body [raw]:**
 
 **URl** <br />
   localhost:3000/api/entrega/:id_entrega <br /> 
   **Status:** `204` <br />
   
  ```
{
    "id_encomenda": 2,
    "id_utilizador":26
}

  ```
  <br />
  
**Resposta:** <br />
  
```json

{
    "message": "Entrega eliminada com sucesso"
}

``` 

 
**Erro** <br />

```json

{
    "message": "Entrega não existe"
}

``` 


async function basiclogin(email, password) {
    const response = await zlFetch.post(loginEndpoint, {
        auth: {
            username: email,
            password: password
        },
        body: { /*...*/ }
    })
    /*Guardar o Token */
    const { token } = response.body

    localStorage.setItem('token', token)
}


/* Verificar se está logado atraves do localStorage.
   Se o localStorage nao tiver o token nao está logado */
async function isLoggedIn() {
    const token = store.get('token')
    if (!token) return false
}
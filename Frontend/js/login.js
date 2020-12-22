<<<<<<< Updated upstream
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
=======
async function basiclogin (email, password) {
    /* zlFetch -> é para tornar o uso da api mais facil */
    const response = await zlFetch.post(loginEndpoint, {
      auth: {
        email: email,
        password: password
      },
      body: { /*...*/ }
    })
  }
>>>>>>> Stashed changes

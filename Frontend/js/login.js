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
    
    // Verificar a validação do token
    const response = await zlFetch.post(loginEndpoint, {
        auth: token,
        body: { course: 'learn-javascript' }
    })

    // Salva o token em localStorage novamente
    const { token } = response.body
    localStorage.setItem('token', token)

    return true
}

/* Se não estiver conectado, redireciono para a página de login */
async function autoRedirect() {
    const validLogin = await isLoggedIn()
    if (!validLogin && location.pathname !== '/login/') redirect('/login')
    if (validLogin && location.pathname === '/login/') redirect('/')
}


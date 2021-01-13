var token = sessionStorage.getItem("tokenSession");

function ajaxToken() {
    return new Promise((resolve, reject) => {
        $.ajax({
            //user = cliente
            url: 'http://localhost:3000/api/tokenUser/user',
            type: 'GET',
            cache: false,
            headers: {
                "Authorization": 'Bearer ' + token
            },
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            }
        })
    })
}


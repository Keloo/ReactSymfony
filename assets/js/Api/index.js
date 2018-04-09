const headers = (token = '') => {
    let header = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };
    if (token !== '') {
        header['Authorization'] = 'Bearer '+token;
    }

    return header;
};

export default {
    handleLogin: function(data, successCallback, failureCallback) {
        fetch('/api/login', {
            method: 'POST',
            headers: headers(),
            body: JSON.stringify({
                username: data.username,
                password: data.password,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.code !== undefined && response.code !== 200) {
                    failureCallback(response);
                    return;
                }
                successCallback(response)
            });
    },
    handleGoogleLogin: function(token, successCallback, failureCallback) {
        fetch('/api/login/google', {
            method: 'POST',
            headers: headers(),
            body: JSON.stringify({token: token}),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.code !== undefined && response.code !== 200) {
                    failureCallback(response);
                    return;
                }
                successCallback(response)
            })
    },
    handleFacebookLogin: function(token, successCallback, failureCallback) {
        fetch('/api/login/facebook', {
            method: 'POST',
            headers: headers(),
            body: JSON.stringify({token: token}),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.code !== undefined && response.code !== 200) {
                    failureCallback(response);
                    return;
                }
                successCallback(response)
            })
    },
    handleRegister: function(data, successCallback, failureCallback) {
        fetch('/api/register', {
            method: 'POST',
            headers: headers(),
            body: JSON.stringify({
                username: data.username,
                email: data.email,
                password: data.password,
            })
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.code !== undefined && response.code !== 200) {
                    failureCallback(response);
                    return;
                }
                successCallback(response);
            })
    },
    getApartments: function(callback) {
        fetch('/api/apartment/list', {
            method: 'GET',
            headers: headers(),
        })
            .then((response) => response.json())
            .then((response) => {
                callback(response);
            });
    },
    getUsers: function(token, callback) {
        fetch('/api/user/list', {
            method: 'GET',
            headers: headers(token),
        })
            .then((response) => response.json())
            .then((response) => {
                callback(response);
            });
    },
    deleteApartment: function(token, id, callback) {
        fetch('/api/apartment', {
            method: "DELETE",
            headers: headers(token),
            body: JSON.stringify({id:id}),
        })
            .then((response) => response.json())
            .then((response) => {
                callback();
            })
    },
    createApartment: function (token, data, callback) {
        fetch('/api/apartment', {
            method: "PUT",
            headers: headers(token),
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((response) => {
                callback();
            })
    },
    editApartment: function (token, data, callback) {
        fetch('/api/apartment/edit', {
            method: "POST",
            headers: headers(token),
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((response) => {
                callback();
            })
    },
    createUser: function (token, data, callback) {
        fetch('/api/user', {
            method: "PUT",
            headers: headers(token),
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((response) => {
                callback();
            })
    },
    editUser: function (token, data, callback) {
        fetch('/api/user/edit', {
            method: "POST",
            headers: headers(token),
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((response) => {
                callback();
            })
    },
    deleteUser: function(token, id, callback) {
        fetch('/api/user', {
            method: "DELETE",
            headers: headers(token),
            body: JSON.stringify({id:id}),
        })
            .then((response) => response.json())
            .then((response) => {
                callback();
            })
    },
}
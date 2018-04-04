const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

export default {
    handleLogin: function(data, successCallback, failureCallback) {
        fetch('api/login', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                username: data.username,
                password: data.password,
            }),
        })
            .then((response) => response.json())
            .then(function(response) {
                if (response.code !== undefined && response.code !== 200) {
                    failureCallback(response);
                    return;
                }
                successCallback(response)
            });
    },
    getApartments: function(callback) {
        fetch('api/apartment/list', {
            method: 'GET',
            headers: headers,
        })
            .then((response) => response.json())
            .then(function(response) {
                console.log('2');
                console.log(response);
                callback(response);
            });
    }
}
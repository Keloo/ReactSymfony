import api from '../Api/index'

// Login actions
export const onLoginInputChange = (name, value) => ({
    type: "LOGIN:INPUT_CHANGE",
    name: name,
    value: value
});
export const onLoginSuccess = (response) => ({
    type: "LOGIN:LOGIN_SUCCESS",
    token: response.token,
});
export const onLoginFailure = (response) => ({
    type: "LOGIN:LOGIN_FAILURE",
    message: response.message,
});
export const onLoginSubmit = (data, dispatch) => {
    api.handleLogin(
        data,
        response => {dispatch(onLoginSuccess(response))},
        response => {dispatch(onLoginFailure(response))}
    )
};

//Register actions
export const onRegisterInputChange = (name, value) => ({
    type: "REGISTER:INPUT_CHANGE",
    name: name,
    value: value
});
export const onRegisterSuccess = (response) => ({
    type: "REGISTER:REGISTER_SUCCESS",
});
export const onRegisterFailure = (response) => ({
    type: "REGISTER:REGISTER_FAILURE",
});
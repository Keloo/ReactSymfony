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
    roles: response.roles,
    username: response.username,
});
export const onLoginFailure = (response) => ({
    type: "LOGIN:LOGIN_FAILURE",
    message: response.message,
});
export const onSignOut = () => ({
    type: "LOGIN:SIGN_OUT"
});
export const onGoogleLoginSubmit = (token, dispatch) => {
    api.handleGoogleLogin(
        token,
        response => {dispatch(onLoginSuccess(response))},
        response => {dispatch(onLoginFailure(response))}
    )
};
export const onFacebookLoginSubmit = (token, dispatch) => {
    api.handleFacebookLogin(
        token,
        response => {dispatch(onLoginSuccess(response))},
        response => {dispatch(onLoginFailure(response))}
    )
};
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
export const onRegisterFailure = (response) => ({
    type: "REGISTER:REGISTER_FAILURE",
    message: response.message,
});
export const onRegisterSuccess = (response) => ({
    type: "REGISTER:REGISTER_SUCCESS",
});
export const onRegisterSubmit = (data, dispatch) => {
    api.handleRegister(
        data,
        response => {
            dispatch(onRegisterSuccess(response));
            dispatch(onLoginSuccess(response));
        },
        response => {dispatch(onRegisterFailure(response))},
    )
};

//Apartment actions
export const onFetchAllApartments = (response) => ({
    type: "APARTMENT:FETCH_ALL",
    apartments: response,
});
export const onSetApartmentEditId = (id) => ({
    type: "APARTMENT:SET_EDIT_ID",
    id: id,
});
export const onApartmentCreate = () => ({
    type: "APARTMENT:CREATE",
});
export const onApartmentInputChange = (name, value) => ({
    type: "APARTMENT:INPUT_CHANGE",
    name: name,
    value: value
});
export const fetchAllApartments = (dispatch) => {
    api.getApartments(response => {dispatch(onFetchAllApartments(response))})
};

//User actions
export const onFetchAllUsers = (response) => ({
    type: "USER:FETCH_ALL",
    users: response,
});
export const onSetUserEditId = (id) => ({
    type: "USER:SET_EDIT_ID",
    id: id,
});
export const onUserCreate = () => ({
    type: "USER:CREATE",
});
export const onUserInputChange = (name, value) => ({
    type: "USER:INPUT_CHANGE",
    name: name,
    value: value
});
export const fetchAllUsers = (dispatch) => {
    api.getUsers(response => {dispatch(onFetchAllUsers(response))});
};
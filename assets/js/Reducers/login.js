export const login = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN:INPUT_CHANGE':
            return {...state, [action.name]: action.value};
        case 'LOGIN:LOGIN_FAILURE':
            console.log("in f");
            console.log(action);
            return {...state, error: true, message: action.message, auth: false};
        case 'LOGIN:LOGIN_SUCCESS':
            return {...state, error: false, message: "", token: action.token, auth: true, roles: action.roles};
        default:
            return state;
    }
};
export const login = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN:SIGN_OUT':
            return {...state, auth: false, token: "", roles: []};
        case 'LOGIN:INPUT_CHANGE':
            return {...state, [action.name]: action.value};
        case 'LOGIN:LOGIN_FAILURE':
            return {...state, error: true, message: action.message, auth: false};
        case 'LOGIN:LOGIN_SUCCESS':
            return {
                ...state,
                error: false,
                message: "",
                token: action.token,
                auth: true,
                roles: action.roles,
                username: action.username,
            };
        default:
            return state;
    }
};
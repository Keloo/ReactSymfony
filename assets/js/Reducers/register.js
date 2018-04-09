export const register = (state = {}, action) => {
    switch (action.type) {
        case "REGISTER:INPUT_CHANGE":
            return {...state, [action.name]: action.value};
        case "REGISTER:REGISTER_FAILURE":
            return {...state, error: true, message: action.message};
        case "REGISTER:REGISTER_SUCCESS":
            return {...state, error: false, message: ""};
        default:
            return state;
    }
};
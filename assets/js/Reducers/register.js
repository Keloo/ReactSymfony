export const register = (state = {}, action) => {
    switch (action.type) {
        case "REGISTER:INPUT_CHANGE":
            return {...state, [action.name]: action.value};
        default:
            return state;
    }
};
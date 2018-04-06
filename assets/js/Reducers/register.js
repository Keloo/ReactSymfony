export const register = (state = {}, action) => {
    console.log('in register reducer');
    console.log(state);
    console.log(action);
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
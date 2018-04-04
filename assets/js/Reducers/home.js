export const home = (state = {}, action) => {
    switch (action.type) {
        case 'HOME:FETCH_APARTMENTS':
            console.log('in reducer');
            console.log(state);
            console.log(action);
            return {...state, apartments: action.apartments};
        default:
            return state;
    }
};
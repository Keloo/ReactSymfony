export const home = (state = {}, action) => {
    switch (action.type) {
        case 'HOME:FETCH_APARTMENTS':
            return {...state, apartments: action.apartments};
        default:
            return state;
    }
};
export const apartment = (state = {}, action) => {
    console.log('Reducer(apartment)');
    console.log(state);
    console.log(action);
    switch (action.type) {
        case 'APARTMENT:FETCH_ALL':
            return {...state, list: action.apartments};
        case 'APARTMENT:SET_EDIT_ID':
            let apartment;
            {state.list.map(function(item) {
                if (item.id === action.id) {
                    apartment = item;
                    return;
                }
            })}
            return {...state, form: apartment, editId: action.id};
        case 'APARTMENT:CREATE':
            return {...state, form: {
                pricePerMonth: '',
                area: '',
                roomCount: '',
                gpsLatitude: '',
                gpsLongitude: '',
                available: true,
            }};
        case 'APARTMENT:INPUT_CHANGE':
            let form = state.form;
            form[action.name] = action.value;
            return {...state, form: form};
        default:
            return state;
    }
};
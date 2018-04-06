export const apartment = (state = {}, action) => {
    switch (action.type) {
        case 'APARTMENT:FETCH_ALL':
            console.log('in apartment reducer');
            console.log(state);
            console.log(action);
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
        case 'APARTMENT:INPUT_CHANGE':
            let form = state.form;
            form[action.name] = action.value;
            return {...state, form: form};
        default:
            return state;
    }
};
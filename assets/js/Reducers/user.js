export const user = (state = {}, action) => {
    console.log('in user reducer');
    console.log(state);
    console.log(action);
    switch (action.type) {
        case "USER:FETCH_ALL":
            return {...state, list: action.users};
        case "USER:SET_EDIT_ID":
            let user;
            {state.list.map(function(item) {
                if (item.id === action.id) {
                    user = item;
                    return;
                }
            })}
            return {...state, form: user, editId: action.id};
        case "USER:CREATE":
            return {...state, form: {
                id: '',
                username: '',
                email: '',
                roles: '',
                enabled: true,
                password: '',
            }};
        case "USER:INPUT_CHANGE":
            let form = state.form;
            form[action.name] = action.value;
            return {...state, form: form};
        default:
            return state;
    }
};
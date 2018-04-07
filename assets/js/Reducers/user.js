export const user = (state = {}, action) => {
    console.log('in user reducer');
    console.log(state);
    console.log(action);
    switch (action.type) {
        //
        default:
            return state;
    }
};
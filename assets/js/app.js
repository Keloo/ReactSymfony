import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './Containers/App'
import rootReducer from './Reducers'

// Create store with default state
const store = createStore(rootReducer, {
    login: {
        auth: false,
        roles: [],
        token: '',
        username: '',
    },
    user: {
        list: [],
    },
    apartment: {
        list: [],
    }
});

render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
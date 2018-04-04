import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './Containers/App'
import rootReducer from './Reducers'

const store = createStore(rootReducer);

render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
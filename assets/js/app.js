import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import Login from './Containers/Login'
import AppBar from './Containers/AppBar'
import Home from './Components/Home'
import RegisterPage from './Containers/Register'
import rootReducer from './Reducers'

const store = createStore(rootReducer);

const theme = createMuiTheme({
    palette: {
        type: 'light',
    },
});

class App extends React.Component {
    constructor() {
        super();
    }

    render() {
        let state = store.getState();
        return (
            <MuiThemeProvider theme={theme}>
                <Grid container justify="center" spacing={16}>
                    <Grid item xs={12}>
                        <AppBar/>
                    </Grid>
                    <Grid item xs={12}>
                        <Route exact path='/' component={Home}/>
                        <Route path='/login' component={!state.login.auth?Login:Dashboard}/>
                        <Route path='/register' component={RegisterPage}/>
                    </Grid>
                </Grid>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(<Router><Provider store={store}><App /></Provider></Router>, document.getElementById('root'));
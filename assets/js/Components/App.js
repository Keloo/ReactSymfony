import React from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import Login from '../Containers/Login'
import AppBar from '../Containers/AppBar'
import RegisterPage from '../Containers/Register'
import Home from './Home'

const theme = createMuiTheme({
    palette: {
        type: 'light',
    },
});

class App extends React.Component {
    render() {
        return (
            <Router>
                <MuiThemeProvider theme={theme}>
                    <Grid container justify="center" spacing={16}>
                        <Grid item xs={12}>
                            <AppBar/>
                        </Grid>
                        <Grid item xs={12}>
                            <Route exact path='/' component={Home}/>
                            <Route path='/login' component={!this.props.auth?Login:Dashboard}/>
                            <Route path='/register' component={RegisterPage}/>
                        </Grid>
                    </Grid>
                </MuiThemeProvider>
            </Router>
        );
    }
}

export default connect()(App);
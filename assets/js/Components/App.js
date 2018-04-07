import React from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import Login from '../Containers/Login'
import AppBar from '../Containers/AppBar'
import Register from '../Containers/Register'
import Home from '../Containers/Home'
import ApartmentEdit from '../Containers/ApartmentEdit'
import ApartmentCreate from '../Containers/ApartmentCreate'
import UsersHome from "../Containers/UsersHome";
import UserCreate from "../Containers/UserCreate";
import UserEdit from "../Containers/UserEdit";

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
                            <Route exact path='/login' component={Login}/>
                            <Route exact path='/register' component={Register}/>
                            <Route exact path='/apartment/edit' component={ApartmentEdit}/>
                            <Route exact path='/apartment/create' component={ApartmentCreate}/>
                            <Route exact path='/user/list' component={UsersHome}/>
                            <Route exact path='/user/create' component={UserCreate}/>
                            <Route exact path='/user/edit' component={UserEdit}/>
                        </Grid>
                    </Grid>
                </MuiThemeProvider>
            </Router>
        );
    }
}

export default connect()(App);
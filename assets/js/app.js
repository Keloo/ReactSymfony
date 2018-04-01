import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import HomePage from './Components/HomePage'
import LoginPage from './Components/LoginPage'
import AppBar from './Components/AppBar'

const theme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

class App extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Grid container spacing={16}>
                    <Grid item xs={12}>
                        <AppBar/>
                    </Grid>
                    <Grid item xs={12}>
                        <Route exact path='/' component={HomePage}/>
                        <Route path='/login' component={LoginPage}/>
                    </Grid>
                </Grid>
            </MuiThemeProvider>

        );
    }
}

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));
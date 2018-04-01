import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import AppBarLogin from './Components/AppBarLogin'
import AppBarLogged from './Components/AppBarLogged'
import HomePage from './Components/HomePage'
import LoginPage from './Components/LoginPage'

const style = {
    title: {
        curosr: 'pointer',
        color: 'inherit',
        textDecoration: 'none'
    }
};

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            logged: false,
        };
    }

    componentDidMount() {}

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <div>
                        <AppBar
                            title={<Link style={style.title} to="/">Toptal app</Link>}
                            iconElementLeft={<FontIcon />}
                            iconElementRight={this.state.logged ? <AppBarLogged /> : <AppBarLogin />}
                        />
                        <Route exact path='/' component={HomePage}/>
                        <Route path='/login' component={LoginPage}/>
                    </div>
                </div>
            </MuiThemeProvider>

        );
    }
}

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));
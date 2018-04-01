import React from 'react'
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

import FacebookLoginButton from './FacebookLoginButton'
import GoogleLoginButton from './GoogleLoginButton'
import LoginForm from './LoginForm'

class LoginPage extends React.Component {
    render() {
        return (
            <Grid container justify="center">
                <Grid item>
                    <Grid container justify="center">
                        <Grid item>
                            <FacebookLoginButton/>
                            <GoogleLoginButton/>
                        </Grid>
                    </Grid>
                    <LoginForm/>
                </Grid>
            </Grid>
        );
    }
}

export default LoginPage;
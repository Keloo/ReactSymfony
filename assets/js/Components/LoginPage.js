import React from 'react'
import FacebookLoginButton from './FacebookLoginButton'
import GoogleLoginButton from './GoogleLoginButton'
import Grid from 'material-ui/Grid';

class LoginPage extends React.Component {
    render() {
        return (
            <Grid container justify="center">
                <Grid item>
                    <FacebookLoginButton/>
                    <GoogleLoginButton/>

                </Grid>
            </Grid>
        );
    }
}

export default LoginPage;
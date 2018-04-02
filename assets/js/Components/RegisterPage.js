import React from 'react'
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography'
import RegisterForm from './RegisterForm'

class RegisterPage extends React.Component {
    render() {
        return (
            <Grid container justify="center">
                <Grid item>
                    <Typography variant='title'>Register</Typography>
                </Grid>
                <Grid container justify='center'>
                    <Grid item>
                        <RegisterForm/>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default RegisterPage;
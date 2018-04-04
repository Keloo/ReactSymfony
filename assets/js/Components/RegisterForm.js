import React from 'react'
import TextField from 'material-ui/TextField'
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

const styles = {
    submit: {
        width: '100%'
    }
};

class RegisterForm extends React.Component {

    handleSubmit() {
        console.log('handl submit');
        console.log(this.props);
    }

    render() {
        return (
                <Grid container justify="center">
                    <Grid container justify="center">
                        <Grid item>
                            <Typography variant='title'>Register</Typography>
                        </Grid>
                    </Grid>
                    <form noValidate action="#" autoComplete="off">
                        <Grid item>
                            <TextField
                                required
                                id="username"
                                label='Username'
                                margin="normal"
                                onChange={(e) => {this.props.onInputChange('username', e.target.value)}}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                required
                                id="email"
                                label='Email'
                                margin="normal"
                                type="email"
                                onChange={(e) => {this.props.onInputChange('email', e.target.value)}}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                required
                                id="password"
                                label='Password'
                                margin="normal"
                                type="password"
                                onChange={(e) => {this.props.onInputChange('password', e.target.value)}}
                            />
                        </Grid>
                        <Grid item>
                            <br/>
                            <Button type='submit' style={styles.submit} onClick={() => this.handleSubmit()} color='primary' variant='raised'>
                                Register
                            </Button>
                        </Grid>
                    </form>
                </Grid>
        );
    }
}

export default RegisterForm
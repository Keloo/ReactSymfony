import React from 'react'
import TextField from 'material-ui/TextField'
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button'

const styles = {
    submit: {
        width: '100%'
    }
};

class LoginForm extends React.Component {
    state = {
        username: "",
        password: ""
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit() {

    }

    render() {
        return (
            <Grid container justify="center">
                <Grid container justify="center">
                    <form noValidate action="#" autoComplete="off">
                        <Grid item>
                            <TextField
                                required
                                id="username"
                                label='Username'
                                margin="normal"
                                onChange={this.handleChange('name')}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                required
                                id="password"
                                label='Password'
                                margin="normal"
                                type="password"
                                onChange={this.handleChange('password')}
                            />
                        </Grid>
                        <Grid item>
                            <br/>
                            <Button type='submit' style={styles.submit} onClick={this.handleSubmit()} color='primary' variant='raised'>
                                Submit
                            </Button>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        );
    }
}

export default LoginForm
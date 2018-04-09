import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

import { onRegisterSubmit } from "../Actions/index"

const styles = {
    submit: {
        width: '100%'
    },
    errorTitle: {
        color: "red",
    }
};

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.auth !== undefined && this.props.auth) {
            this.props.history.push('/');
        }
    }

    componentDidUpdate() {
        if (this.props.auth !== undefined && this.props.auth) {
            this.props.history.push('/');
        }
    }

    handleSubmit() {
        let data = {
            username: this.props.username,
            email: this.props.email,
            password: this.props.password,
        };
        onRegisterSubmit(data, this.props.dispatch);
    }

    render() {
        return (
                <Grid container justify="center">
                    <Grid container justify="center">
                        <Grid item>
                            <Typography variant='title'>Register</Typography>
                        </Grid>
                    </Grid>
                    {this.props.error !== undefined && this.props.error && (
                        <Grid container justify="center">
                            <Grid item>
                                <Typography style={styles.errorTitle} variant='subheading'>{this.props.message}</Typography>
                            </Grid>
                        </Grid>
                    )}
                    <form noValidate autoComplete="off">
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
                            <Button style={styles.submit} onClick={() => this.handleSubmit()} color='primary' variant='raised'>
                                Register
                            </Button>
                        </Grid>
                    </form>
                </Grid>
        );
    }
}

export default connect()(RegisterForm);
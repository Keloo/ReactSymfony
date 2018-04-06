import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

import FacebookLogin from '../Containers/FacebookLogin'
import GoogleLogin from '../Containers/GoogleLogin'
import { onLoginSubmit } from "../Actions/index"

const styles = {
    submit: {
        width: '100%'
    },
    errorTitle: {
        color: "red",
    }
};

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        console.log('in login constr');
        console.log(this.props);
        if (this.props.auth !== undefined && this.props.auth) {
            this.props.history.push('/');
        }
    }

    onSubmit() {
        const data = {
            username: this.props.username,
            password: this.props.password,
        };
        onLoginSubmit(data, this.props.dispatch);
    }

    componentDidUpdate() {
        console.log('login did update');
        console.log(this.props);
        if (this.props.auth !== undefined && this.props.auth) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <Grid container justify="center">
                <Grid container justify="center">
                    <Grid item>
                        <FacebookLogin/>
                        <GoogleLogin/>
                    </Grid>
                </Grid>
                <Grid container justify="center">
                    {this.props.error !== undefined && (
                        <Grid container justify='center'>
                            <Grid item>
                                <br/>
                                <Typography variant='title' style={styles.errorTitle}>
                                    {this.props.message}
                                </Typography>
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
                                id="password"
                                label='Password'
                                margin="normal"
                                type="password"
                                onChange={(e) => {this.props.onInputChange('password', e.target.value)}}
                            />
                        </Grid>
                        <Grid item>
                            <br/>
                            <Button style={styles.submit} onClick={() => this.onSubmit()} color='primary' variant='raised'>
                                Submit
                            </Button>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        );
    }
}

export default connect()(LoginForm)
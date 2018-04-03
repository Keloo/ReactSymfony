import React from 'react'
import TextField from 'material-ui/TextField'
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

const styles = {
    submit: {
        width: '100%'
    },
    errorTitle: {
        color: "red",
    }
};

class LoginForm extends React.Component {
    state = {
        error: {
            has: false,
            message: ""
        },
        username: "",
        password: ""
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit() {
        let that = this;
        try {
            fetch('api/login_check', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                }),
            })
                .then((response) => response.json())
                .catch((error) => console.error(error))
                .then(function(response) {
                    if (response.status != 200) {
                        that.setState({
                            error: {
                                has: true,
                                message: response.message,
                            }
                        });
                        return 0;
                    }

                    console.log('good');
                    that.setState({
                        auth: true,
                    })
                });
        } catch(e) {
            console.log(e);
        }
    };

    render() {
        return (
            <Grid container justify="center">
                <Grid container justify="center">
                    {this.state.error.has && (
                        <Grid container justify='center'>
                            <Grid item>
                                <br/>
                                <Typography variant='title' style={styles.errorTitle}>
                                    {this.state.error.message}
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
                            <Button style={styles.submit} onClick={() => this.handleSubmit()} color='primary' variant='raised'>
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
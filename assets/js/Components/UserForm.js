import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Switch from 'material-ui/Switch'

const styles = {
    submit: {
        width: '100%'
    }
};

class UserForm extends React.Component {
    constructor(props) {
        super(props);
        console.log('user form construct');
        console.log(this.props);
    }

    onSubmit() {
        console.log("UserForm:submit");
        console.log(this.props);
    }

    render() {
        return (
            <Grid container justify="center">
                <Grid container justify='center'>
                    <Grid item>
                        <br/>
                        <Typography variant='title'>
                            {this.props.title}
                        </Typography>
                    </Grid>
                </Grid>
                <form noValidate autoComplete="off">
                    <Grid item>
                        <TextField
                            required
                            id="username"
                            label='Username'
                            margin="normal"
                            value={this.props.user.username}
                            onChange={(e) => {this.props.onInputChange('username', e.target.value)}}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            id="email"
                            label='Email'
                            margin="normal"
                            value={this.props.user.email}
                            onChange={(e) => {this.props.onInputChange('email', e.target.value)}}
                        />
                    </Grid>
                    Available:
                    <Switch
                        checked={this.props.user.enabled}
                        onChange={(e) => {this.props.onInputChange('enabled', e.target.checked)}}
                        value="enabled"
                        color="primary"
                    />

                    <Grid item>
                        <br/>
                        <Button style={styles.submit} onClick={() => this.onSubmit()} color='primary' variant='raised'>
                            Submit
                        </Button>
                    </Grid>
                </form>
            </Grid>
        );
    }
}

export default connect()(UserForm)
import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Switch from 'material-ui/Switch'
import {
    FormLabel,
    FormControl,
    FormGroup,
    FormControlLabel,
    FormHelperText,
} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

const styles = {
    submit: {
        width: '100%'
    },
    roles: {
        margin: "16px 0 8px 0",
    }
};

const roles = [
    "ROLE_REALTOR",
    "ROLE_SUPER_ADMIN",
];

class UserForm extends React.Component {
    constructor(props) {
        super(props);
    }

    onRoleInputChange(role) {
        let userRoles = this.props.user.roles;
        if (userRoles.indexOf(role) === -1) {
            userRoles.push(role);
        } else {
            userRoles = userRoles.filter(r => r !== role);
        }
        this.props.onInputChange('roles', userRoles);
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
                    <Grid item>
                        <TextField
                            placeholder="new password"
                            id="password"
                            label='Password'
                            margin="normal"
                            value={this.props.user.password}
                            onChange={(e) => {this.props.onInputChange('password', e.target.value)}}
                        />
                    </Grid>
                    <Grid>
                        <FormControl component="fieldset" style={styles.roles}>
                            <FormLabel component="legend">Roles</FormLabel>
                            <FormGroup>
                                {roles.map((role) => {
                                    return (
                                        <FormControlLabel
                                            key={role}
                                            control={
                                                <Checkbox
                                                    checked={this.props.user.roles.indexOf(role) !== -1}
                                                    onChange={(e) => {this.onRoleInputChange(e.target.value)}}
                                                    value={role}
                                                />
                                            }
                                            label={role}
                                        />
                                    )
                                })}
                            </FormGroup>
                            <FormHelperText>There is no ROLE_GOD</FormHelperText>
                        </FormControl>
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
                        <Button style={styles.submit} onClick={() => this.props.onSubmit(this.props)} color='primary' variant='raised'>
                            Submit
                        </Button>
                    </Grid>
                </form>
            </Grid>
        );
    }
}

export default connect()(UserForm)
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

import Utils from '../Components/Utils'

const styles = {
    submit: {
        width: '100%'
    },
    roles: {
        margin: "16px 0 8px 0",
    }
};

class UserForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            signOut: false,
        };
        if (this.props.user.form.username === this.props.login.username) {
            this.state.signOut = true;
        }
    }

    onRoleInputChange(role) {
        let userRoles = this.props.user.form.roles;
        if (userRoles.indexOf(role) === -1) {
            userRoles.push(role);
        } else {
            userRoles = userRoles.filter(r => r !== role);
        }
        this.props.onInputChange('roles', userRoles);
    }

    render() {
        const { user } = this.props;

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
                            value={user.form.username}
                            onChange={(e) => {this.props.onInputChange('username', e.target.value)}}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            id="email"
                            label='Email'
                            margin="normal"
                            value={user.form.email}
                            onChange={(e) => {this.props.onInputChange('email', e.target.value)}}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            placeholder="new password"
                            id="password"
                            type='password'
                            label='Password'
                            margin="normal"
                            value={user.form.password}
                            onChange={(e) => {this.props.onInputChange('password', e.target.value)}}
                        />
                    </Grid>
                    <Grid>
                        <FormControl component="fieldset" style={styles.roles}>
                            <FormLabel component="legend">Roles</FormLabel>
                            <FormGroup>
                                {[Utils.ROLE_REALTOR, Utils.ROLE_SUPER_ADMIN].map((role) => {
                                    return (
                                        <FormControlLabel
                                            key={role}
                                            control={
                                                <Checkbox
                                                    checked={user.form.roles.indexOf(role) !== -1}
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
                        checked={user.form.enabled}
                        onChange={(e) => {this.props.onInputChange('enabled', e.target.checked)}}
                        value="enabled"
                        color="primary"
                    />

                    <Grid item>
                        <br/>
                        <Button style={styles.submit} onClick={() => this.props.onSubmit(this.props, this.state.signOut)} color='primary' variant='raised'>
                            Submit
                        </Button>
                    </Grid>
                </form>
            </Grid>
        );
    }
}

export default connect()(UserForm)
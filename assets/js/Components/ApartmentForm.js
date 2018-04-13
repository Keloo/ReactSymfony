import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Switch from 'material-ui/Switch'
import { FormControl } from 'material-ui/Form'
import Select from 'material-ui/Select'
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import {onApartmentInputChange} from "../Actions/index";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: "16px 0 8px 0",
        width: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    submit: {
        width: '100%'
    }
});

class ApartmentForm extends React.Component {
    constructor(props) {
        super(props);
    }

    handleUserChange(username) {
        let newUser = this.props.apartment.user;
        this.props.users.map((user) => {
            if (user.username === username) {
                newUser = user;
                return;
            }
        });
        this.props.dispatch(onApartmentInputChange('user', newUser));
    };

    render() {
        const { classes, apartment } = this.props;

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
                            id="pricePerMonth"
                            label='Price per month'
                            margin="normal"
                            type="number"
                            value={apartment.pricePerMonth}
                            onChange={(e) => {this.props.onInputChange('pricePerMonth', e.target.value)}}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            id="area"
                            label='Area'
                            margin="normal"
                            type="number"
                            value={apartment.area}
                            onChange={(e) => {this.props.onInputChange('area', e.target.value)}}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            id="roomCount"
                            label='Rooms count'
                            margin="normal"
                            type="number"
                            value={apartment.roomCount}
                            onChange={(e) => {this.props.onInputChange('roomCount', e.target.value)}}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            id="gpsLatitude"
                            label='GPS Latitude'
                            margin="normal"
                            value={apartment.gpsLatitude}
                            onChange={(e) => {this.props.onInputChange('gpsLatitude', e.target.value)}}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            id="gpsLongitude"
                            label='GPS Longitude'
                            margin="normal"
                            value={apartment.gpsLongitude}
                            onChange={(e) => {this.props.onInputChange('gpsLongitude', e.target.value)}}
                        />
                    </Grid>
                    <Grid>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="user">User</InputLabel>
                            <Select
                                value={apartment.user.username}
                                onChange={(e) => {this.handleUserChange(e.target.value)}}
                                inputProps={{
                                    name: 'user',
                                    id: 'user',
                                }}
                            >
                                <MenuItem value={apartment.user.username?apartment.user.username:""}>
                                    <em>{apartment.user.username}</em>
                                </MenuItem>
                                {this.props.users !== undefined && this.props.users.map((user) => {
                                    return (
                                        <MenuItem key={user.id} value={user.username}>{user.username}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    Available:
                    <Switch
                        checked={apartment.available}
                        onChange={(e) => {this.props.onInputChange('available', e.target.checked)}}
                        value="available"
                        color="primary"
                    />

                    <Grid item>
                        <br/>
                        <Button className={classes.submit} onClick={() => {this.props.onSubmit(this.props)}} color='primary' variant='raised'>
                            Submit
                        </Button>
                    </Grid>
                </form>
            </Grid>
        );
    }
}

export default connect()(withStyles(styles)(ApartmentForm));
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

class ApartmentForm extends React.Component {
    constructor(props) {
        super(props);
        console.log('apartment form construct');
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
                            id="pricePerMonth"
                            label='Price per month'
                            margin="normal"
                            type="number"
                            value={this.props.apartment.pricePerMonth}
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
                            value={this.props.apartment.area}
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
                            value={this.props.apartment.roomCount}
                            onChange={(e) => {this.props.onInputChange('roomCount', e.target.value)}}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            id="gpsLatitude"
                            label='GPS Latitude'
                            margin="normal"
                            value={this.props.apartment.gpsLatitude}
                            onChange={(e) => {this.props.onInputChange('gpsLatitude', e.target.value)}}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            id="gpsLongitude"
                            label='GPS Longitude'
                            margin="normal"
                            value={this.props.apartment.gpsLongitude}
                            onChange={(e) => {this.props.onInputChange('gpsLongitude', e.target.value)}}
                        />
                    </Grid>
                    Available:
                    <Switch
                        checked={this.props.apartment.available}
                        onChange={(e) => {this.props.onInputChange('available', e.target.checked)}}
                        value="available"
                        color="primary"
                    />

                    <Grid item>
                        <br/>
                        <Button style={styles.submit} onClick={() => this.onSubmit()} color='primary' variant='raised'>
                            Save
                        </Button>
                    </Grid>
                </form>
            </Grid>
        );
    }
}

export default connect()(ApartmentForm)
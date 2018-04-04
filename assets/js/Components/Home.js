import React from 'react'
import { connect } from 'react-redux'
import Grid from 'material-ui/Grid';
import ApartmentsTable from '../Containers/ApartmentsTable';
import ApartmentsMap from '../Containers/ApartmentsMap';
import { homeFetchApartments } from "../Actions/index";

class Home extends React.Component {

    componentWillMount() {
        console.log('1');
        console.log(this.props);
        homeFetchApartments(this.props.dispatch);
    }

    render() {

        return (
            <Grid container justify="center" spacing={16}>
                <Grid item xs={12} padding={16}>
                    <ApartmentsTable />
                </Grid>
                <br/>
                <Grid item xs={12} padding={16}>
                    <ApartmentsMap />
                </Grid>
            </Grid>
        );
    }
}

export default connect()(Home);
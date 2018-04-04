import React from 'react'
import { connect } from 'react-redux'
import Grid from 'material-ui/Grid';
import ApartmentsTable from '../Containers/ApartmentsTable';
import ApartmentsMap from '../Components/ApartmentsMap';

import { homeFetchApartments } from "../Actions/index";

class Home extends React.Component {

    componentWillMount() {
        console.log('1');
        console.log(this.props);
        homeFetchApartments(this.props.dispatch);
    }

    render() {

        return (
            <Grid container justify="center">
                <Grid item>
                    <h1>Welcome</h1>
                    <ApartmentsTable />
                    <ApartmentsMap />
                </Grid>
            </Grid>
        );
    }
}

export default connect()(Home);
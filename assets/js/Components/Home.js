import React from 'react'
import { connect } from 'react-redux'
import Grid from 'material-ui/Grid';
import { homeFetchApartments } from "../Actions/index";

class Home extends React.Component {

    componentWillMount() {
        console.log('1');
        console.log(this.props);
        homeFetchApartments(this.props.dispatch);
    }

    renderApartments() {
        if (!this.props.apartments) return "";
        return (
            this.props.apartments.map((item) => (
                <div key={item.id}>{item.id}</div>
            ))
        );
    }

    render() {

        return (
            <Grid container justify="center">
                <Grid item>
                    <h1>Welcome</h1>
                    {this.renderApartments()}
                </Grid>
            </Grid>
        );
    }
}

export default connect()(Home);
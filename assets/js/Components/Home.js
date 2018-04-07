import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid';
import ApartmentsTable from '../Containers/ApartmentsTable';
import ApartmentsMap from '../Containers/ApartmentsMap';
import { fetchAllApartments, onApartmentCreate } from "../Actions/index";

const styles = {
    link: {
        color: 'inherit',
        textDecoration: 'none',
        padding: 15,
    }
};

class Home extends React.Component {

    componentWillMount() {
        console.log('1');
        console.log(this.props);
        fetchAllApartments(this.props.dispatch);
    }

    handleUserList() {
        console.log('in home (handleuserlist)');
        console.log(this.props);
        // this.props.dispatch(onApartmentCreate());
    }

    handleCreateApartment() {
        console.log('in home:haldeCreateApartment');
        console.log(this.props);
        this.props.dispatch(onApartmentCreate());
    }


    render() {

        return (
            <Grid container justify="center" spacing={16}>
                <Grid item xs={12} padding={16}>
                    <Link style={styles.link} to="/user/list">
                        <Button color="primary" variant="raised" onClick={() => {this.handleUserList()}}>
                            User list
                        </Button>
                    </Link>
                    <Link style={styles.link} to="/apartment/create">
                        <Button color="primary" variant="raised" onClick={() => {this.handleCreateApartment()}}>
                            Create apartment
                        </Button>
                    </Link>
                </Grid>
                <Grid item xs={12} padding={16}>
                    <ApartmentsTable history={this.props.history} />
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
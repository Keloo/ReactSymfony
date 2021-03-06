import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid';
import ApartmentsTable from '../Containers/ApartmentsTable';
import ApartmentsMap from '../Containers/ApartmentsMap';
import { fetchAllApartments, onApartmentCreate, fetchAllUsers } from "../Actions/index";
import Utils from './Utils'

const styles = {
    link: {
        color: 'inherit',
        textDecoration: 'none',
        padding: 15,
    }
};

class Home extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.login.auth === false) {
            this.props.history.push('/login');
        }
        if (Utils.hasRole(this.props.login.roles, Utils.ROLE_USER)) {
            fetchAllApartments(this.props.dispatch);
        }
        if (Utils.hasRole(this.props.login.roles, Utils.ROLE_SUPER_ADMIN)) {
            fetchAllUsers(this.props.login.token, this.props.dispatch);
        }
    }

    handleCreateApartment = () => {
        this.props.dispatch(onApartmentCreate(this.props.user.list));
    };

    render() {
        return (
            <Grid container justify="center" spacing={16}>
                {Utils.hasRole(this.props.login.roles, Utils.ROLE_REALTOR) && (
                    <Grid item xs={12} padding={16}>
                        {Utils.hasRole(this.props.login.roles, Utils.ROLE_SUPER_ADMIN) && (
                            <Link style={styles.link} to="/user/list">
                                <Button color="primary" variant="raised">
                                    User list
                                </Button>
                            </Link>
                        )}
                        <Link style={styles.link} to="/apartment/create">
                            <Button color="primary" variant="raised" onClick={this.handleCreateApartment}>
                                Create apartment
                            </Button>
                        </Link>
                    </Grid>
                )}
                {Utils.hasRole(this.props.login.roles, Utils.ROLE_USER) && (
                    <Grid container justify="center">
                        <Grid item xs={12} padding={16}>
                            <ApartmentsTable history={this.props.history} />
                        </Grid>
                        <br/>
                        <Grid item xs={12} padding={16}>
                        <ApartmentsMap />
                        </Grid>
                    </Grid>
                )}
            </Grid>
        );
    }
}

export default connect()(Home);
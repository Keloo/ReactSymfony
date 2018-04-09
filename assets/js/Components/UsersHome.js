import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid';
import UsersTable from '../Containers/UsersTable';
import { onUserCreate } from "../Actions/index";

const styles = {
    link: {
        color: 'inherit',
        textDecoration: 'none',
        padding: 15,
    }
};

class UsersHome extends React.Component {
    handleCreateUser() {
        this.props.dispatch(onUserCreate());
    }

    render() {
        return (
            <Grid container justify="center" spacing={16}>
                <Grid item xs={12} padding={16}>
                    <Link style={styles.link} to="/user/create">
                        <Button color="primary" variant="raised" onClick={() => {this.handleCreateUser()}}>
                            Create user
                        </Button>
                    </Link>
                </Grid>
                <Grid item xs={12} padding={16}>
                    <UsersTable history={this.props.history} />
                </Grid>
            </Grid>
        );
    }
}

export default connect()(UsersHome);
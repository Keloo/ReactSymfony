import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button'

import { onSetUserEditId } from "../Actions/index";

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    link: {
        color: 'inherit',
        textDecoration: 'none'
    },
});

class UsersTable extends React.Component {
    constructor(props) {
        super(props);
        console.log('UsersTable:constructor');
        console.log(this);
        this.state = {
            users: this.props.users?this.props.users:[]
        }
    }

    componentDidUpdate(props) {
        console.log("UsersTable:cDU");
        console.log(props);
        console.log(this.props);
        if (props.users === this.props.users) return;
        let users = this.props.users?this.props.users:[];
        this.setState({
            users: users,
        })
    }

    handleEdit(id) {
        this.props.dispatch(onSetUserEditId(id));
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell numeric>Username</TableCell>
                            <TableCell numeric>Email</TableCell>
                            <TableCell numeric>Roles</TableCell>
                            <TableCell numeric>Available</TableCell>
                            <TableCell numeric>EDIT</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.users.map(n => {
                            return (
                                <TableRow key={n.id}>
                                    <TableCell>{n.id}</TableCell>
                                    <TableCell numeric>{n.username}</TableCell>
                                    <TableCell numeric>{n.email}</TableCell>
                                    <TableCell numeric>{n.rolse}</TableCell>
                                    <TableCell numeric>{n.available}</TableCell>
                                    <TableCell numeric>
                                        <Link className={classes.link} to='/user/edit'>
                                            <Button variant="raised" color="primary" onClick={() => {this.handleEdit(n.id)}}>
                                                Edit
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}


UsersTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(UsersTable));
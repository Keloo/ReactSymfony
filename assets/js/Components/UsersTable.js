import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button'
import Chip from 'material-ui/Chip';
import Checkbox from 'material-ui/Checkbox'

import Utils from './Utils'
import { deleteUser, onSetUserEditId } from "../Actions/index";

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
        textDecoration: 'none',
        marginRight: 15,
    },
});

class UsersTable extends React.Component {
    render() {
        const { classes, login, user, dispatch } = this.props;

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
                            {Utils.hasRole(login.roles, Utils.ROLE_SUPER_ADMIN) && (
                                <TableCell numeric>Edit/Delete</TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {user.list.map(n => {
                            return (
                                <TableRow key={n.id}>
                                    <TableCell>{n.id}</TableCell>
                                    <TableCell numeric>{n.username}</TableCell>
                                    <TableCell numeric>{n.email}</TableCell>
                                    <TableCell numeric>
                                        {n.roles.map((role) => <Chip key={role} label={role} />)}
                                    </TableCell>
                                    <TableCell numeric>
                                        {n.enabled?
                                            <Checkbox disabled checked />:
                                            <Checkbox disabled />}
                                    </TableCell>
                                    {Utils.hasRole(login.roles, Utils.ROLE_SUPER_ADMIN) && (
                                        <TableCell numeric>
                                            <Link className={classes.link} to='/user/edit'>
                                                <Button
                                                    variant="raised"
                                                    color="primary"
                                                    onClick={() => {dispatch(onSetUserEditId(n.id));}}
                                                >
                                                    Edit
                                                </Button>
                                            </Link>
                                            <Button
                                                onClick={() => {deleteUser(login.token, n.id, dispatch);}}
                                                color="secondary"
                                                variant="raised"
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    )}
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
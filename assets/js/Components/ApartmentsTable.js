import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, {
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'

import Utils from './Utils'
import {deleteApartment, onSetApartmentEditId} from "../Actions/index";

const styles = theme => ({
    link: {
        color: 'inherit',
        textDecoration: 'none',
        marginRight: 15,
    },
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 800,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class ApartmentsTable extends React.Component {
    handleEdit = (id) => {
        this.props.dispatch(onSetApartmentEditId(id));
    };

    handleDelete = (id) => {
        deleteApartment(this.props.login.token, id, this.props.dispatch);
    };

    canEditOrDelete(apartment) {
        if (Utils.hasRole(this.props.login.roles, Utils.ROLE_SUPER_ADMIN)) {
            return true;
        }
        if (Utils.hasRole(this.props.login.roles, Utils.ROLE_REALTOR)
            && apartment.user.username === this.props.login.username) {
            return true;
        }

        return false;
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell numeric>Price per month</TableCell>
                            <TableCell numeric>Area</TableCell>
                            <TableCell numeric>Room count</TableCell>
                            <TableCell numeric>Available</TableCell>
                            {Utils.hasRole(this.props.login.roles, Utils.ROLE_REALTOR) && (
                                <TableCell numeric>Edit/Delete</TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.apartment.list.map(n => {
                            return (
                                <TableRow key={n.id}>
                                    <TableCell>{n.id}</TableCell>
                                    <TableCell numeric>{n.pricePerMonth}</TableCell>
                                    <TableCell numeric>{n.area}</TableCell>
                                    <TableCell numeric>{n.roomCount}</TableCell>
                                    <TableCell numeric>
                                        {n.available?
                                            <Checkbox disabled checked />:
                                            <Checkbox disabled />
                                        }
                                    </TableCell>
                                    <TableCell numeric>
                                        {this.canEditOrDelete(n) && (
                                            <div>
                                                <Link className={classes.link} to='/apartment/edit'>
                                                    <Button
                                                        variant="raised"
                                                        color="primary"
                                                        onClick={() => {this.handleEdit(n.id)}}
                                                    >
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Button
                                                    onClick={() => this.handleDelete(n.id)}
                                                    color="secondary"
                                                    variant="raised"
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

ApartmentsTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(ApartmentsTable));

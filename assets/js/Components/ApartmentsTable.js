import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, {
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Tooltip from 'material-ui/Tooltip';
import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'

import Utils from './Utils'
import {deleteApartment, onSetApartmentEditId} from "../Actions/index";

const columnData = [
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'pricePerMonth', numeric: true, disablePadding: false, label: 'Price per month' },
    { id: 'area', numeric: true, disablePadding: false, label: 'Area' },
    { id: 'roomCount', numeric: true, disablePadding: false, label: 'Room count' },
];

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { order, orderBy, roles } = this.props;

        return (
            <TableHead>
                <TableRow>
                    {columnData.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                numeric={column.numeric}
                                padding={column.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === column.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={order}
                                        onClick={this.createSortHandler(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                    {Utils.hasRole(roles, Utils.ROLE_SUPER_ADMIN) && (
                        <TableCell key='edit' numeric >Edit / Delete</TableCell>
                    )}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
};

const styles = theme => ({
    link: {
        color: 'inherit',
        textDecoration: 'none',
        marginRight: 15,
    },
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 800,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class EnhancedTable extends React.Component {
    constructor(props, context) {
        super(props, context);
        let apartments = this.props.apartments?this.props.apartments:[];
        this.state = {
            order: 'asc',
            orderBy: 'pricePerMonth',
            data: apartments.sort((a, b) => (a.pricePerMonth < b.pricePerMonth ? -1 : 1)),
            page: 0,
            rowsPerPage: 5,
        };
    }

    componentDidUpdate(nextProps) {
        if (nextProps.apartments === this.props.apartments) return;

        let apartments = this.props.apartments?this.props.apartments:[];
        this.setState({
            data: apartments.sort((a, b) => (a.pricePerMonth < b.pricePerMonth ? -1 : 1)),
        })
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const data =
            order === 'desc'
                ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

        this.setState({ data, order, orderBy });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    handleEdit = (id) => {
        console.log('in edit');
        console.log(id);
        this.props.dispatch(onSetApartmentEditId(id));
    };

    handleDelete = (id) => {
        console.log("ApartmentsTable:handleDelete");
        console.log(id);
        deleteApartment(this.props.authUser.token, id, this.props.dispatch);
    };

    render() {
        const { classes, authUser } = this.props;
        const { data, order, orderBy, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <EnhancedTableHead
                            roles={authUser.roles}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.handleRequestSort}
                        />
                        <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={n.id}
                                    >
                                        <TableCell>{n.id}</TableCell>
                                        <TableCell numeric>{n.pricePerMonth}</TableCell>
                                        <TableCell numeric>{n.area}</TableCell>
                                        <TableCell numeric>{n.roomCount}</TableCell>
                                        {Utils.hasRole(authUser.roles, Utils.ROLE_SUPER_ADMIN) && (
                                            <TableCell numeric>
                                                <Link className={classes.link} to='/apartment/edit'>
                                                    <Button onClick={() => this.handleEdit(n.id)} color="primary" variant="raised">
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Button onClick={() => this.handleDelete(n.id)} color="secondary" variant="raised">
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    colSpan={6}
                                    count={data.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    backIconButtonProps={{
                                        'aria-label': 'Previous Page',
                                    }}
                                    nextIconButtonProps={{
                                        'aria-label': 'Next Page',
                                    }}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </Paper>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(EnhancedTable));

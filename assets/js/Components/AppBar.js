import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'mdi-material-ui/AccountCircle';
import Menu, { MenuItem } from 'material-ui/Menu';
import {Link} from 'react-router-dom'
import Button from 'material-ui/Button'

import { onSignOut } from "../Actions/index";

const styles = {
    link: {
        color: 'inherit',
        textDecoration: 'none'
    },
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class MenuAppBar extends React.Component {
    state = {
        anchorEl: null,
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget }); // show menu
    };

    handleClose = () => {
        console.log('in handle close');
        this.props.dispatch(onSignOut());
        this.setState({ anchorEl: null }); //hide menu
        this.history.push('/');
    };

    handleCloseWithoutSignOut = () => {
        console.log('in handle close without sign out');
        this.setState({ anchorEl: null }); //hide menu
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            <Link style={styles.link} to='/'>
                                Toptal app
                            </Link>
                        </Typography>
                        {!this.props.auth && (
                            <div>
                                <Link style={styles.link} to='/login'>
                                    <Button color='inherit'>Login</Button>
                                </Link>
                                <Link style={styles.link} to='/register'>
                                    <Button color='inherit'>Register</Button>
                                </Link>
                            </div>
                        )}
                        {this.props.auth && (
                            <div>
                                {this.props.username?this.props.username:""}
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : null}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleCloseWithoutSignOut}
                                >
                                    {/*<MenuItem onClick={this.handleClose}>Profile</MenuItem>*/}
                                    <MenuItem onClick={this.handleClose}>Sign out</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(MenuAppBar));

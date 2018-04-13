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
        menu: {
            show: false,
            anchor: null,
        }
    };

    toggleMenu = (e) => {
        this.setState({
            menu: {
                show: !this.state.menu.show,
                anchor: e.currentTarget,
            }
        });
    };

    handleSignOut = (e) => {
        this.toggleMenu(e);
        this.props.dispatch(onSignOut());
        this.props.history.push('/login');
    };

    render() {
        const { classes } = this.props;
        const { show, anchor } = this.state.menu;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            <Link style={styles.link} to='/'>
                                Toptal app
                            </Link>
                        </Typography>
                        {!this.props.login.auth && (
                            <div>
                                <Link style={styles.link} to='/login'>
                                    <Button color='inherit'>Login</Button>
                                </Link>
                                <Link style={styles.link} to='/register'>
                                    <Button color='inherit'>Register</Button>
                                </Link>
                            </div>
                        )}
                        {this.props.login.auth && (
                            <div>
                                {this.props.login.username}
                                <IconButton
                                    aria-owns={show ? 'menu-appbar' : null}
                                    aria-haspopup="true"
                                    onClick={this.toggleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchor}
                                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                                    transformOrigin={{vertical: 'top', horizontal: 'right'}}
                                    open={show}
                                    onClose={this.toggleMenu}
                                >
                                    <MenuItem onClick={this.handleSignOut}>Sign out</MenuItem>
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

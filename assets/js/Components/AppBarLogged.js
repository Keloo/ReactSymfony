import React from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


class AppBarLogged extends React.Component {
    static muiName = 'IconMenu';

    render() {
        return (
            <IconMenu
                {...this.props}
                iconButtonElement={
                    <IconButton><MoreVertIcon /></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <MenuItem primaryText="Profile" />
                <MenuItem primaryText="Sign out" />
            </IconMenu>
        );
    }
}

export default AppBarLogged;
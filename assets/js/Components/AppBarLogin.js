import React from 'react';
import Buton from 'material-ui/Button'
import {Link} from 'react-router-dom'

class AppBarLogin extends React.Component {
    static muiName = 'FlatButton';

    render() {
        return (
            <Link to='/login'>
                <Button {...this.props} label="Login" />
            </Link>
        );
    }
}

export default AppBarLogin;
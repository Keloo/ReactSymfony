import React from 'react'
import SocialLogin from 'react-social-login'
import RaisedButton from 'material-ui/RaisedButton'

const style = {
    margin: 12,
};

const Button = ({ children, triggerLogin, ...props }) => (
    <RaisedButton style={style} primary={true} onClick={triggerLogin} {...props}>
        { children }
    </RaisedButton>
);

export default SocialLogin(Button)
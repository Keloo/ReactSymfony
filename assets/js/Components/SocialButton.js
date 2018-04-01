import React from 'react'
import SocialLogin from 'react-social-login'
import Button from 'material-ui/Button'

const style = {
    margin: 12,
};

const SocialButton = ({ children, triggerLogin, ...props }) => (
    <Button style={style} color="primary" variant="raised" onClick={triggerLogin} {...props}>
        { children }
    </Button>
);

export default SocialLogin(SocialButton)
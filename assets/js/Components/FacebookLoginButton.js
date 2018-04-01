import React from 'react'
import SocialButton from './SocialButton'
import FacebookIcon from 'material-ui-community-icons/icons/facebook-box'

const handleSocialLogin = (user) => {
    console.log(user)
}

const handleSocialLoginFailure = (err) => {
    console.error(err)
}

class FacebookLoginButton extends React.Component {
    static muiName = 'FlatButton';
    render() {
        return (
            <SocialButton
                {...this.props}
                label="Login"
                labelPosition="after"
                icon={<FacebookIcon />}
                provider='facebook'
                appId='330456840431220'
                onLoginSuccess={handleSocialLogin}
                onLoginFailure={handleSocialLoginFailure}
            />
        );
    }
}

export default FacebookLoginButton;
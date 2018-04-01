import React from 'react'
import SocialButton from './SocialButton'
import FacebookIcon from 'mdi-material-ui/FacebookBox'

const handleSocialLogin = (user) => {
    console.log(user)
};

const handleSocialLoginFailure = (err) => {
    console.error(err)
};

class FacebookLoginButton extends React.Component {
    static muiTheme = 'Button';

    render() {
        return (
            <SocialButton
                provider='facebook'
                appId='330456840431220'
                onLoginSuccess={handleSocialLogin}
                onLoginFailure={handleSocialLoginFailure}
            >
                Sign with &nbsp;
                <FacebookIcon />
            </SocialButton>
        );
    }
}

export default FacebookLoginButton;
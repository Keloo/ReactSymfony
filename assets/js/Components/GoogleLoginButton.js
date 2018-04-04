import React from 'react'
import GoogleIcon from 'mdi-material-ui/GooglePlusBox'

import SocialButton from './SocialButton'


const handleSocialLogin = (user) => {
    console.log(user)
};

const handleSocialLoginFailure = (err) => {
    console.error(err)
};

class GoogleLoginButton extends React.Component {
    static muiName = 'FlatButton';
    render() {
        return (
            <SocialButton
                provider='google'
                appId='120385458561-sctdjmm53v2ga7tib7k2vckam921mpqm.apps.googleusercontent.com'
                onLoginSuccess={handleSocialLogin}
                onLoginFailure={handleSocialLoginFailure}
            >
                Sign with &nbsp;
                <GoogleIcon />
            </SocialButton>
        );
    }
}

export default GoogleLoginButton;
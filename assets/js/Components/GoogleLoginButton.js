import React from 'react'
import SocialButton from './SocialButton'
import GoogleIcon from 'material-ui-community-icons/icons/google-plus-box'

const handleSocialLogin = (user) => {
    console.log(user)
}

const handleSocialLoginFailure = (err) => {
    console.error(err)
}

class GoogleLoginButton extends React.Component {
    static muiName = 'FlatButton';
    render() {
        return (
            <SocialButton
                {...this.props}
                label="Login"
                labelPosition="after"
                provider='google'
                icon={<GoogleIcon />}
                appId='120385458561-sctdjmm53v2ga7tib7k2vckam921mpqm.apps.googleusercontent.com'
                onLoginSuccess={handleSocialLogin}
                onLoginFailure={handleSocialLoginFailure}
            />
        );
    }
}

export default GoogleLoginButton;
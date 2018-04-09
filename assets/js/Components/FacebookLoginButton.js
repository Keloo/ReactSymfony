import React from 'react'
import { connect } from 'react-redux'
import FacebookIcon from 'mdi-material-ui/FacebookBox'

import SocialButton from './SocialButton'
import { onFacebookLoginSubmit } from "../Actions/index";

class FacebookLoginButton extends React.Component {
    static muiTheme = 'Button';

    handleSocialLogin = (user) => {
        onFacebookLoginSubmit(user._token, this.props.dispatch);
    };

    handleSocialLoginFailure = (err) => {
        //@todo
    };

    render() {
        return (
            <SocialButton
                provider='facebook'
                appId='330456840431220'
                scope="email"
                onLoginSuccess={this.handleSocialLogin}
                onLoginFailure={this.handleSocialLoginFailure}
            >
                Sign with &nbsp;
                <FacebookIcon />
            </SocialButton>
        );
    }
}

export default connect()(FacebookLoginButton);
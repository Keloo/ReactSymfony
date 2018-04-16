import React from 'react'
import { connect } from 'react-redux'
import GoogleIcon from 'mdi-material-ui/GooglePlusBox'
import { onGoogleLoginSubmit, onLoginFailure } from '../Actions/index'

import SocialButton from './SocialButton'



class GoogleLoginButton extends React.Component {
    static muiName = 'FlatButton';

    constructor(props) {
        super(props);
    }

    handleSocialLogin = (user) => {
        onGoogleLoginSubmit(user._token, this.props.dispatch);
    };

    handleSocialLoginFailure = (err) => {
        //@todo
        //handle pop up close (for now ignore)

        // this.props.dispatch(onLoginFailure({
        //     message: "Something went wrong, try again"
        // }));
    };

    render() {
        return (
            <SocialButton
                provider='google'
                appId='<google_app_id>'
                onLoginSuccess={this.handleSocialLogin}
                onLoginFailure={this.handleSocialLoginFailure}
            >
                Sign with &nbsp;
                <GoogleIcon />
            </SocialButton>
        );
    }
}

export default connect()(GoogleLoginButton);
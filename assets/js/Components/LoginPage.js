import React from 'react'
import FacebookLoginButton from './FacebookLoginButton'
import GoogleLoginButton from './GoogleLoginButton'

class LoginPage extends React.Component {
    render() {
        return (
            <div>
                <FacebookLoginButton/>
                <GoogleLoginButton/>
            </div>
        );
    }
}

export default LoginPage;
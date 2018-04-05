import { connect } from 'react-redux'
import GoogleLoginButton from '../Components/GoogleLoginButton'

const mapStateToProps = state => {
    return {
        //
    }
};

const mapDispatchToProps = dispatch => {
    return {
        //
    }
};

const GoogleLogin = connect(
    mapStateToProps,
    mapDispatchToProps
)(GoogleLoginButton);

export default GoogleLogin;
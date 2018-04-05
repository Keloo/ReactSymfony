import { connect } from 'react-redux'
import FacebookLoginButton from '../Components/FacebookLoginButton'

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

const FacebookLogin = connect(
    mapStateToProps,
    mapDispatchToProps
)(FacebookLoginButton);

export default FacebookLogin;
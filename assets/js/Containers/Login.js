import { connect } from 'react-redux'
import LoginForm from '../Components/LoginForm'
import { onLoginInputChange } from "../Actions/index";

const mapStateToProps = state => {
    return {
        username: state.login.username,
        password: state.login.password,
        error: state.login.error,
        message: state.login.message,
        auth: state.login.auth,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInputChange: (name, value) => {
            dispatch(onLoginInputChange(name, value))
        }
    }
};

const Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);

export default Login;
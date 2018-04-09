import { connect } from 'react-redux'
import RegisterForm from '../Components/RegisterForm'
import { onRegisterInputChange } from "../Actions/index";

const mapStateToProps = state => {
    return {
        username: state.register.username,
        email: state.register.email,
        password: state.register.password,
        error: state.register.error,
        message: state.register.message,
        auth: state.login.auth,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInputChange: (name, value) => {
            dispatch(onRegisterInputChange(name, value))
        }
    }
};

const Register = connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterForm);

export default Register;
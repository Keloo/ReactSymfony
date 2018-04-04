import { connect } from 'react-redux'
import RegisterForm from '../Components/RegisterForm'
import { onRegisterInputChange } from "../Actions/index";

const mapStateToProps = state => {
    console.log('in rahat');
    console.log(state);
    return {

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
import { connect } from 'react-redux'
import UserForm from '../Components/UserForm'
import {createUser, onUserInputChange} from "../Actions/index";

const mapStateToProps = state => {
    console.log('userCreateContainer:mapState');
    console.log(state);
    return {
        user: {
            id: state.user.form.id,
            username: state.user.form.username,
            email: state.user.form.email,
            roles: state.user.form.roles,
            enabled: state.user.form.enabled,
            password: state.user.form.password,
        },
        authUser: {
            token: state.login.token,
        },
        title: "User Create",
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInputChange: (name, value) => {
            dispatch(onUserInputChange(name, value))
        },
        onSubmit: (props) => {
            createUser(props.authUser.token, props.user, dispatch);
            props.history.push('/user/list');
        }
    }
};


const UserCreate = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserForm);

export default UserCreate;
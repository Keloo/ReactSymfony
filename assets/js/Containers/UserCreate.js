import { connect } from 'react-redux'
import UserForm from '../Components/UserForm'
import {createUser, onUserInputChange} from "../Actions/index";

const mapStateToProps = state => {
    return {
        user: state.user,
        login: state.login,
        title: "User Create",
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInputChange: (name, value) => {
            dispatch(onUserInputChange(name, value))
        },
        onSubmit: (props, signOut) => {
            createUser(props.login.token, props.user, dispatch);
            props.history.push('/user/list');
        }
    }
};


const UserCreate = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserForm);

export default UserCreate;
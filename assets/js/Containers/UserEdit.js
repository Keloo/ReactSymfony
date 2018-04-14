import { connect } from 'react-redux'
import UserForm from '../Components/UserForm'
import {editUser, onUserInputChange, onSignOut} from "../Actions/index";

const mapStateToProps = state => {
    return {
        user: state.user,
        login: state.login,
        title: "User Edit",
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInputChange: (name, value) => {
            dispatch(onUserInputChange(name, value))
        },
        onSubmit: (props, signOut) => {
            editUser(props.login.token, props.user.form, dispatch);
            if (signOut) {
                dispatch(onSignOut());
                props.history.push('/');
            } else {
                props.history.push('/user/list');
            }
        }
    }
};


const UserEdit = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserForm);

export default UserEdit;
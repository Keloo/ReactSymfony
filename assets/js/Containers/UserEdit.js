import { connect } from 'react-redux'
import UserForm from '../Components/UserForm'
import {editUser, onUserInputChange} from "../Actions/index";

const mapStateToProps = state => {
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
        title: "User Edit",
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInputChange: (name, value) => {
            dispatch(onUserInputChange(name, value))
        },
        onSubmit: (props) => {
            editUser(props.authUser.token, props.user, dispatch);
            props.history.push('/user/list');
        }
    }
};


const UserEdit = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserForm);

export default UserEdit;
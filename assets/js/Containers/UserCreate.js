import { connect } from 'react-redux'
import UserForm from '../Components/UserForm'
import { onUserInputChange } from "../Actions/index";

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
        },
        title: "User Create",
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInputChange: (name, value) => {
            dispatch(onUserInputChange(name, value))
        }
    }
};


const UserCreate = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserForm);

export default UserCreate;
import { connect } from 'react-redux'
import UserForm from '../Components/UserForm'
import { onUserInputChange } from "../Actions/index";

const mapStateToProps = state => {
    console.log('userEditContainer:mapState');
    console.log(state);
    return {
        user: {
            id: state.user.form.id,
            username: state.user.form.username,
            email: state.user.form.email,
            roles: state.user.form.roles,
            enabled: state.user.form.enabled,
        },
        title: "User Edit",
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInputChange: (name, value) => {
            dispatch(onUserInputChange(name, value))
        }
    }
};


const UserEdit = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserForm);

export default UserEdit;
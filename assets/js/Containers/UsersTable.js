import { connect } from 'react-redux'
import UsersTableComponent from '../Components/UsersTable'

const mapStateToProps = state => {
    return {
        users: state.user.list?state.user.list:[],
        authUser: {
            roles: state.login.roles,
            token: state.login.token,
            username: state.login.username,
        },
    }
};

const mapDispatchToProps = dispatch => {
    return {
        //add actions
    }
};

const UsersTable = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UsersTableComponent);

export default UsersTable;
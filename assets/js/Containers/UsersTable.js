import { connect } from 'react-redux'
import UsersTableComponent from '../Components/UsersTable'

const mapStateToProps = state => {
    return {
        user: state.user,
        login: state.login,
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
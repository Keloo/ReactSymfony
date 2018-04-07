import { connect } from 'react-redux'
import UsersTableComponent from '../Components/UsersTable'

const mapStateToProps = state => {
    return {
        users: state.user.list?state.user.list:[],
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
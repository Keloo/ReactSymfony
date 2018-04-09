import { connect } from 'react-redux'
import ApartmentsTableComponent from '../Components/ApartmentsTable'

const mapStateToProps = state => {
    return {
        apartments: state.apartment.list,
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

const ApartmentsTable = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ApartmentsTableComponent);

export default ApartmentsTable;
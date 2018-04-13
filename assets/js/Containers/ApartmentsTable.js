import { connect } from 'react-redux'
import ApartmentsTableComponent from '../Components/ApartmentsTable'

const mapStateToProps = state => {
    return {
        apartment: state.apartment,
        login: state.login,
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
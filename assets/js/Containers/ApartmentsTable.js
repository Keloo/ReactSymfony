import { connect } from 'react-redux'
import ApartmentsTableComponent from '../Components/ApartmentsTable'

const mapStateToProps = state => {
    return {
        apartments: state.apartment.list,
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
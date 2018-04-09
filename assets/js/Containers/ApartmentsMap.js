import { connect } from 'react-redux'
import ApartmentsMapComponent from '../Components/ApartmentsMap'

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

const ApartmentsMap = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ApartmentsMapComponent);

export default ApartmentsMap;
import { connect } from 'react-redux'
import ApartmentsMapComponent from '../Components/ApartmentsMap'

const mapStateToProps = state => {
    console.log('state change map');
    console.log(state);
    return {
        apartments: state.home.apartments,
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
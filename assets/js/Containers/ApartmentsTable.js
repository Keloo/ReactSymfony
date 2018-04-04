import { connect } from 'react-redux'
import ApartmentsTableComponent from '../Components/ApartmentsTable'

const mapStateToProps = state => {
    console.log('state changed');
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

const ApartmentsTable = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ApartmentsTableComponent);

export default ApartmentsTable;
import { connect } from 'react-redux'
import ApartmentForm from '../Components/ApartmentForm'
import { onApartmentInputChange } from "../Actions/index";

const mapStateToProps = state => {
    console.log('state change apartment create');
    console.log(state);
    return {
        title: "Apartment Create",
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInputChange: (name, value) => {
            dispatch(onApartmentInputChange(name, value))
        }
    }
};


const ApartmentCreate = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ApartmentForm);

export default ApartmentCreate;
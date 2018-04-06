import { connect } from 'react-redux'
import ApartmentForm from '../Components/ApartmentForm'
import { onApartmentInputChange } from "../Actions/index";

const mapStateToProps = state => {
    console.log('state change apartment edit');
    console.log(state);
    return {
        apartment: {
            pricePerMonth: state.apartment.form.pricePerMonth,
            area: state.apartment.form.area,
            roomCount: state.apartment.form.roomCount,
            gpsLatitude: state.apartment.form.gpsLatitude,
            gpsLongitude: state.apartment.form.gpsLongitude,
            available: state.apartment.form.available,
        },
        title: "Apartment Edit",
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInputChange: (name, value) => {
            dispatch(onApartmentInputChange(name, value))
        }
    }
};

const ApartmentEdit = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ApartmentForm);

export default ApartmentEdit;
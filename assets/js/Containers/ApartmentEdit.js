import { connect } from 'react-redux'
import ApartmentForm from '../Components/ApartmentForm'
import {editApartment, onApartmentInputChange} from "../Actions/index";

const mapStateToProps = state => {
    console.log('Container(ApartmentEdit)');
    console.log(state);
    return {
        apartment: {
            id: state.apartment.form.id,
            pricePerMonth: state.apartment.form.pricePerMonth,
            area: state.apartment.form.area,
            roomCount: state.apartment.form.roomCount,
            gpsLatitude: state.apartment.form.gpsLatitude,
            gpsLongitude: state.apartment.form.gpsLongitude,
            available: state.apartment.form.available,
            user: state.apartment.form.user,
        },
        users: state.user.list,
        title: "Apartment Edit",
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInputChange: (name, value) => {
            dispatch(onApartmentInputChange(name, value))
        },
        onSubmit: (props) => {
            editApartment(props.apartment, dispatch);
            props.history.push('/');
        }
    }
};

const ApartmentEdit = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ApartmentForm);

export default ApartmentEdit;
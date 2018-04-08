import { connect } from 'react-redux'
import ApartmentForm from '../Components/ApartmentForm'
import {createApartment, onApartmentInputChange} from "../Actions/index";

const mapStateToProps = state => {
    console.log('state change apartment create');
    console.log(state);
    return {
        apartment: {
            pricePerMonth: state.apartment.form.pricePerMonth,
            area: state.apartment.form.area,
            roomCount: state.apartment.form.roomCount,
            gpsLatitude: state.apartment.form.gpsLatitude,
            gpsLongitude: state.apartment.form.gpsLongitude,
            available: state.apartment.form.available,
            user: state.apartment.form.user,
        },
        users: state.user.list,
        title: "Apartment Create",
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInputChange: (name, value) => {
            dispatch(onApartmentInputChange(name, value))
        },
        onSubmit: (props) => {
            createApartment(props.apartment, dispatch);
            props.history.push('/');
        }
    }
};


const ApartmentCreate = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ApartmentForm);

export default ApartmentCreate;
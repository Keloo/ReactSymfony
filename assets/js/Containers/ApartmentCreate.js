import { connect } from 'react-redux'
import ApartmentForm from '../Components/ApartmentForm'
import {createApartment, onApartmentInputChange} from "../Actions/index";

const mapStateToProps = state => {
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
        users: state.user.list !== undefined ? state.user.list : [],
        authUser: {
            token: state.login.token,
        },
        title: "Apartment Create",
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInputChange: (name, value) => {
            dispatch(onApartmentInputChange(name, value))
        },
        onSubmit: (props) => {
            createApartment(props.authUser.token, props.apartment, dispatch);
            props.history.push('/');
        }
    }
};


const ApartmentCreate = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ApartmentForm);

export default ApartmentCreate;
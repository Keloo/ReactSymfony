import { connect } from 'react-redux'
import ApartmentForm from '../Components/ApartmentForm'
import {editApartment, onApartmentInputChange} from "../Actions/index";

const mapStateToProps = state => {
    console.log(state.apartment.form);
    return {
        apartment: state.apartment,
        user: state.user,
        login: state.login,
        title: "Apartment Edit",
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInputChange: (name, value) => {
            dispatch(onApartmentInputChange(name, value))
        },
        onSubmit: (props) => {
            editApartment(props.login.token, props.apartment.form, dispatch);
            props.history.push('/');
        }
    }
};

const ApartmentEdit = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ApartmentForm);

export default ApartmentEdit;
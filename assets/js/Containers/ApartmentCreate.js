import { connect } from 'react-redux'
import ApartmentForm from '../Components/ApartmentForm'
import {createApartment, onApartmentInputChange} from "../Actions/index";

const mapStateToProps = state => {
    return {
        apartment: state.apartment,
        user: state.user,
        login: state.login,
        title: "Apartment Create",
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInputChange: (name, value) => {
            dispatch(onApartmentInputChange(name, value))
        },
        onSubmit: (props) => {
            createApartment(props.login.token, props.apartment.form, dispatch);
            props.history.push('/');
        }
    }
};


const ApartmentCreate = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ApartmentForm);

export default ApartmentCreate;
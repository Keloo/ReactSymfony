import { connect } from 'react-redux'
import AppBar from '../Components/AppBar'

const mapStateToProps = state => {
    console.log('valera');
    console.log(state);
    return {
        auth: state.login.auth === undefined ? false : state.login.auth,
    }
};


const Bar = connect(
    mapStateToProps,
)(AppBar);

export default Bar;
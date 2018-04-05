import { connect } from 'react-redux'
import AppBar from '../Components/AppBar'

const mapStateToProps = state => {
    return {
        auth: state.login.auth === undefined ? false : state.login.auth,
        username: state.login.username,
    }
};


const Bar = connect(
    mapStateToProps,
)(AppBar);

export default Bar;
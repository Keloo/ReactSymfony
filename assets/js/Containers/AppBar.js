import { connect } from 'react-redux'
import AppBar from '../Components/AppBar'

const mapStateToProps = state => {
    return {
        login: state.login,
    }
};

const Bar = connect(
    mapStateToProps,
)(AppBar);

export default Bar;
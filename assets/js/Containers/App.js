import { connect } from 'react-redux'
import AppComponent from '../Components/App'

const mapStateToProps = state => {
    return {
        auth: state.login.auth,
    }
};

const App = connect(
    mapStateToProps,
)(AppComponent);

export default App;
import { connect } from 'react-redux'
import HomeComponent from '../Components/Home'

const mapStateToProps = state => {
    return {
        // auth: state.login.auth,
    }
};

const Home = connect(
    mapStateToProps,
)(HomeComponent);

export default Home;
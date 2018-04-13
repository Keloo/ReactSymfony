import { connect } from 'react-redux'
import HomeComponent from '../Components/Home'

const mapStateToProps = state => {
    return {
        user: state.user,
        login: state.login,
    }
};


const mapDispatchToProps = dispatch => {
    return {
        //add actions
    }
};

const Home = connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomeComponent);

export default Home;
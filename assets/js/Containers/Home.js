import { connect } from 'react-redux'
import HomeComponent from '../Components/Home'

const mapStateToProps = state => {
    return {
        apartments: state.home.apartments,
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
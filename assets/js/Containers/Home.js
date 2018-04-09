import { connect } from 'react-redux'
import HomeComponent from '../Components/Home'

const mapStateToProps = state => {
    return {
        users: state.user.list,
        authUser: {
            roles: state.login.roles,
            token: state.login.token,
            username: state.login.username,
        },
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
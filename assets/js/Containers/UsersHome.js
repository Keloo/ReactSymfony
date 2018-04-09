import { connect } from 'react-redux'
import UsersHomeComponent from '../Components/UsersHome'

const mapStateToProps = state => {
    return {

    }
};


const mapDispatchToProps = dispatch => {
    return {
        //add actions
    }
};

const UsersHome = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UsersHomeComponent);

export default UsersHome;
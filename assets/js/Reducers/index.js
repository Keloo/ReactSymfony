import { combineReducers } from 'redux'
import { login } from './login'
import { register } from './register'
import { apartment } from './apartment'
import { user } from './user'

export default combineReducers({
    login,
    register,
    apartment,
    user,
})
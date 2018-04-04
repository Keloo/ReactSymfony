import { combineReducers } from 'redux'
import { login } from './login'
import { register } from './register'
import { home } from './home'

export default combineReducers({
    login,
    register,
    home
})
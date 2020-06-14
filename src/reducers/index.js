import { combineReducers } from 'redux'
import notifications from './notification'
import user from './user'
import state from './state'


export default combineReducers({
    notifications,
    user,
    state
})
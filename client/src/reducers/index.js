import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import match from './match';
export default combineReducers({
    alert,
    auth,
    profile,
    match
})
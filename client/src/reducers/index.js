import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import match from './match';
import ticTacToe from './ticTacToe';
export default combineReducers({
    alert,
    auth,
    profile,
    match,
    ticTacToe
})
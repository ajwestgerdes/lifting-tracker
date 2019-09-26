//Where all the reducers meet

import { combineReducers } from 'redux';
import liftReducer from './liftReducer';

export default combineReducers({
    lift: liftReducer
});
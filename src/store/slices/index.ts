import {  combineReducers } from '@reduxjs/toolkit';
import userRducer from './loginSlice';
import navReducer from './navSlice'
const rootReducers= combineReducers({
    user:userRducer,
    nav: navReducer
});

export default rootReducers;
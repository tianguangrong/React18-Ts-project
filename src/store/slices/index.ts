import {  combineReducers } from '@reduxjs/toolkit';
import userRducer from './loginSlice';
const rootReducers= combineReducers({
    user:userRducer,
});

export default rootReducers;
import { configureStore } from '@reduxjs/toolkit';
import  rootReducers  from "./slices/index";
const store = configureStore({
    reducer: rootReducers,
})
export type AppDispatch = typeof store.dispatch;
export default store;
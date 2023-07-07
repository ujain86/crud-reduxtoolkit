import {configureStore} from '@reduxjs/toolkit';
import usersReducer from './features/postSlice';


const store = configureStore({
    reducer: {usersReducer}
})

export default store;
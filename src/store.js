import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './slices/SliceUser'


export default configureStore({
    reducer : {
        user:UserReducer
     }
})
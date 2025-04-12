import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice"
import jobReducer from "./features/jobSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        job: jobReducer,
    }
})

export default store
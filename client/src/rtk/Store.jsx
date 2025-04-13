import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice"
import jobReducer from "./features/jobSlice"
import proposalReducer from "./features/ProposalSlice"
import viewReducer from "./features/viewSlice"
import notificationReducer from "./features/notificationSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        job: jobReducer,
        proposals: proposalReducer,
        views: viewReducer,
        notifications: notificationReducer
    }
})

export default store
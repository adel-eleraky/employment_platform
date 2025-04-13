import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../utils/api";

export const viewEmployee = createAsyncThunk("views/viewEmployee", async (empId, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${API_URL}/employer/view/${empId}`, null , { withCredentials: true })
        return data

    } catch (err) {
        return rejectWithValue(err?.response?.data)
    }
})



export const getViews = createAsyncThunk("employee/views" , async (_ , { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${API_URL}/employee/views` , { withCredentials: true})
        return data

    }catch(err) {
        return rejectWithValue(err?.response?.data)
    }
})


const view = createSlice({
    name: "proposal",
    initialState: {
        newView: "",
        loading: false,
        errors: null,
        message: "",
        employeeViews: []
    },
    extraReducers: (builder) => {
        builder
            .addCase(viewEmployee.fulfilled , (state, action) => {
                state.status = action.payload.status
                state.newView = action.payload.data
            })
            .addCase(getViews.fulfilled , (state , action) => {
                state.status = action.payload.status
                state.employeeViews = action.payload.data
            })
    }
})

export default view.reducer
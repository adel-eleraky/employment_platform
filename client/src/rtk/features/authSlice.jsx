import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../utils/api";

export const login = createAsyncThunk("auth/login" , async (credentials , { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${API_URL}/auth/login` , credentials , { withCredentials: true})
        return data

    }catch(err) {
        return rejectWithValue(err?.response?.data)
    }
})


export const register = createAsyncThunk("auth/register" , async (credentials , { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${API_URL}/auth/register` , credentials , { withCredentials: true})
        return data

    }catch(err) {
        return rejectWithValue(err?.response?.data)
    }
})


const auth = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        errors: null,
        message: ""
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.pending , (state, action) => {
            state.loading = true
            state.errors = null
        })
        .addCase(login.fulfilled , (state, action) => {
            state.user = action.payload.data
            state.status = action.payload.status
            state.message = action.payload.message
            state.loading = false
        })
        .addCase(login.rejected , (state, action) => {
            state.errors = action.payload.errors
            state.status = action.payload.status
            state.message = action.payload.message
            state.loading = false
        })
        .addCase(register.pending , (state, action) => {
            state.loading = true
            state.errors = null
        })
        .addCase(register.fulfilled , (state, action) => {
            state.user = action.payload.data
            state.status = action.payload.status
            state.message = action.payload.message
            state.loading = false
        })
        .addCase(register.rejected , (state, action) => {
            state.errors = action.payload.errors
            state.status = action.payload.status
            state.message = action.payload.message
            state.loading = false
        })
    }
})

export default auth.reducer
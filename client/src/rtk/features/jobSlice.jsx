import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../utils/api";



export const getAllJobs = createAsyncThunk("job/getAll", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${API_URL}/jobs`)
        return data

    } catch (err) {
        return rejectWithValue(err?.response?.data)
    }
})


export const getEmployerJobs = createAsyncThunk("job/employerJobs", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${API_URL}/jobs/employer` , { withCredentials: true })
        return data

    } catch (err) {
        return rejectWithValue(err?.response?.data)
    }
})

export const createJob = createAsyncThunk("job/create", async (jobData, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${API_URL}/jobs`, jobData, { withCredentials: true })
        return data

    } catch (err) {
        return rejectWithValue(err?.response?.data)
    }
})



export const applyForJob = createAsyncThunk("job/apply", async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${API_URL}/jobs/apply`, {jobId: id} , { withCredentials: true })
        return data

    } catch (err) {
        return rejectWithValue(err?.response?.data)
    }
})



export const getAppliedJobs = createAsyncThunk("job/applied", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${API_URL}/jobs/applied` , { withCredentials: true })
        return data

    } catch (err) {
        return rejectWithValue(err?.response?.data)
    }
})

const job = createSlice({
    name: "job",
    initialState: {
        jobs: null,
        loading: false,
        errors: null,
        message: "",
        newJob: null,
        employerJobs: null,
        applyMessage: "",
        appliedJobs: []
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllJobs.pending, (state, action) => {
                state.loading = true
                state.errors = null
            })
            .addCase(getAllJobs.fulfilled, (state, action) => {
                state.jobs = action.payload.data
                state.status = action.payload.status
                state.message = action.payload.message
                state.loading = false
            })
            .addCase(createJob.pending, (state, action) => {
                state.loading = true
                state.errors = null
            })
            .addCase(createJob.fulfilled, (state, action) => {
                state.newJob = action.payload.data
                state.status = action.payload.status
                state.message = action.payload.message
                state.loading = false
            })
            .addCase(createJob.rejected, (state, action) => {
                state.errors = action.payload.errors
                state.status = action.payload.status
                state.message = action.payload.message
                state.loading = false
            })
            .addCase(getEmployerJobs.fulfilled, (state, action) => {
                state.employerJobs = action.payload.data
                state.status = action.payload.status
            })
            .addCase(applyForJob.fulfilled, (state, action) => {
                state.status = action.payload.status
                state.applyMessage = action.payload.message
                state.data = action.payload.data
                // state.appliedJobs.push(action.payload.data.job)
            })
            .addCase(getAppliedJobs.fulfilled, (state, action) => {

                state.appliedJobs = action.payload.data
                // action.payload.data.map(job => {
                //     state.appliedJobs.push(job.job)
                // })
            })
    }
})

export default job.reducer
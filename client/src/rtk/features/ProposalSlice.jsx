import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../utils/api";

export const getJobProposals = createAsyncThunk("proposal/getJobProposals", async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${API_URL}/jobs/${id}/proposals` , { withCredentials: true })
        return data

    } catch (err) {
        return rejectWithValue(err?.response?.data)
    }
})



export const acceptProposal = createAsyncThunk("proposal/accept", async ( {jobId , empId}, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`${API_URL}/jobs/${jobId}/proposal/${empId}/accept` , null, { withCredentials: true })
        return data

    } catch (err) {
        return rejectWithValue(err?.response?.data)
    }
})


export const rejectProposal = createAsyncThunk("proposal/reject", async ( {jobId , empId}, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`${API_URL}/jobs/${jobId}/proposal/${empId}/reject` , null, { withCredentials: true })
        return data

    } catch (err) {
        return rejectWithValue(err?.response?.data)
    }
})


export const getBestMatch = createAsyncThunk("proposal/best", async ( id, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${API_URL}/jobs/${id}/getBestMatch` , { withCredentials: true })
        return data

    } catch (err) {
        return rejectWithValue(err?.response?.data)
    }
})

const proposal = createSlice({
    name: "proposal",
    initialState: {
        proposals: [],
        loading: false,
        errors: null,
        message: "",
        acceptedProposal: null,
        rejectedProposal: null,
        filteredProposals: []
    },
    extraReducers: (builder) => {
        builder
            .addCase(getJobProposals.fulfilled , (state, action) => {
                state.proposals = action.payload.data
            })
            .addCase(acceptProposal.fulfilled , (state, action) => {
                state.status = action.payload.status
                state.message = action.payload.message
                state.acceptedProposal = action.payload.data
            })
            .addCase(rejectProposal.fulfilled , (state, action) => {
                state.status = action.payload.status
                state.message = action.payload.message
                state.rejectedProposal = action.payload.data
            })
            .addCase(getBestMatch.fulfilled , (state, action) => {
                state.status = action.payload.status
                state.filteredProposals = action.payload.data
            })
    }
})

export default proposal.reducer
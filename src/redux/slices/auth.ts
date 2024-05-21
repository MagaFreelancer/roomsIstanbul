import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../thunk";

const initialState = {
    user: {},
    isLogged: false,
    isloading: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload.data
            state.isLogged = true
            state.isloading = false
        })
        builder.addCase(loginUser.pending, (state) => {
            state.user = {}
            state.isLogged = false
            state.isloading = true
        })
        builder.addCase(loginUser.rejected, (state) => {
            state.user = {}
            state.isLogged = false
            state.isloading = true
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.user = action.payload.data
            state.isLogged = true
            state.isloading = false
        })
        builder.addCase(registerUser.pending, (state) => {
            state.user = {}
            state.isLogged = false
            state.isloading = true
        })
        builder.addCase(registerUser.rejected, (state) => {
            state.user = {}
            state.isLogged = false
            state.isloading = true
        })
    },
})

export default authSlice.reducer
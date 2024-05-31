import { createSlice } from "@reduxjs/toolkit";
import { fetchAuthMe, loginUser, registerUser } from "../thunk/auth";
import { IStateType, IUserData } from "../../common/types/auth";
import { RootState } from "../store";

const initialState: IStateType = {
    user: {
        token: '',
        user: {} as IUserData,
    },
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
            state.isLogged = false
            state.isloading = true
        })
        builder.addCase(loginUser.rejected, (state) => {
            state.isLogged = false
            state.isloading = true
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.user = action.payload.data
            state.isLogged = true
            state.isloading = false
        })
        builder.addCase(registerUser.pending, (state) => {
            state.isLogged = false
            state.isloading = true
        })
        builder.addCase(registerUser.rejected, (state) => {
            state.isLogged = false
            state.isloading = true
        })
        builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
            state.user.user = action.payload
            state.isLogged = true
            state.isloading = false
        })
        builder.addCase(fetchAuthMe.pending, (state) => {
            state.isLogged = false
            state.isloading = true
        })
        builder.addCase(fetchAuthMe.rejected, (state) => {
            state.isLogged = false
            state.isloading = true
        })
    },
})
export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer
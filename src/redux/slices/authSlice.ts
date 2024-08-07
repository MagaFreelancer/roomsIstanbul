import { createSlice } from "@reduxjs/toolkit";
import { fetchAuthMe, fetchPatchProfile, loginUser, registerUser } from "../thunk/auth";
import { IStateType, IUserData } from "../../common/types/auth";
import { RootState } from "../store";

const initialState: IStateType = {
    user: {
        token: '',
        data: {} as IUserData,
    },
    isLogged: false,
    isloading: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = {
                token: '',
                data: {} as IUserData,
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload
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
            state.user = action.payload
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
            state.user.data = action.payload
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
        builder.addCase(fetchPatchProfile.fulfilled, (state, action) => {
            state.user.data = action.payload
            state.isLogged = true
            state.isloading = false
        })
        builder.addCase(fetchPatchProfile.pending, (state) => {
            state.isLogged = false
            state.isloading = true
        })
        builder.addCase(fetchPatchProfile.rejected, (state) => {
            state.isLogged = false
            state.isloading = true
        })
    },
})
export const selectAuth = (state: RootState) => state.auth
export const { logout } = authSlice.actions
export default authSlice.reducer
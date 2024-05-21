import { createAsyncThunk } from "@reduxjs/toolkit";
import { IRegisterData, IloginData } from "../../common/types/auth";
import instance from "../../utils/axios";

export const loginUser = createAsyncThunk('auth/login',
    async (
        data: IloginData,
        { rejectWithValue }
    ) => {
        try {
            const user = await instance.post('/auth', data)
            sessionStorage.setItem('token', user.data.token)
            sessionStorage.setItem('name', user.data.data.firstName)
            return user.data
        }
        catch (error: any) {
            if (error.message && error.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    })

export const registerUser = createAsyncThunk('auth/register',
    async (
        data: IRegisterData,
        { rejectWithValue }
    ) => {
        try {
            const user = await instance.post('/register', data)
            sessionStorage.setItem('token', user.data.token)
            sessionStorage.setItem('name', user.data.data.firstName)
            return user.data
        }
        catch (error: any) {
            if (error.message && error.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    })
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserData, IloginData } from "../../../common/types/auth";
import instance from "../../../utils/axios";

export const loginUser = createAsyncThunk('auth/login',
    async (
        data: IloginData,
        { rejectWithValue }
    ) => {
        try {
            console.log(data);
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
        data: IUserData,
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
export const fetchAuthMe = createAsyncThunk('auth/me',
    async (
        _,
        { rejectWithValue }
    ) => {
        try {
            const token = sessionStorage.getItem('token')

            const user = await instance.get('/auth_me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
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

export const fetchPatchProfile = createAsyncThunk('auth/profile',
    async (
        { id, changedData }: { id: number, changedData: IUserData },
        { rejectWithValue }
    ) => {
        try {

            const user = await instance.patch(`/users/${id}`, changedData)

            return user.data
        }
        catch (error: any) {
            if (error.message && error.changedData.message) {
                return rejectWithValue(error.response.changedData.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    })
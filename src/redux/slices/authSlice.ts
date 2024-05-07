import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { DataStatus } from './roomsSlice';
import { RootState } from '../store';
import axios from 'axios'


export interface UserAuth {
    email: string
    password: string | number
}
export interface UserType {
    email: string
    id: string | number
    login: string,
    imageUrl: string
}
export interface DataType {
    token: string
    data: UserType
}

interface StateType {
    data: DataType | null
    token: string | null
    status: DataStatus.FAILED | DataStatus.SUCCESS | DataStatus.LOADING
}
const initialState: StateType = {
    data: null,
    token: null,
    status: DataStatus.LOADING
}
export const fetchAuth = createAsyncThunk<DataType, UserAuth>('auth/fetchSlice',
    async (params) => {

        const { data } = await axios.post<DataType>(
            'https://0175150936641c7d.mokky.dev/auth',
            params
        )
        console.log(data);

        return data
    })
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuth.pending, (state) => {
                state.status = DataStatus.LOADING
                state.data = null
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.status = DataStatus.SUCCESS
                state.data = action.payload
            })
            .addCase(fetchAuth.rejected, (state) => {
                state.status = DataStatus.FAILED
                state.data = null
            })
    }
})
export const selectAuth = (state: RootState) => Boolean( state.authSlice.data)
// export const selectAuth = () => true
export const selectAuthData = (state: RootState) => state.authSlice.data


export default authSlice.reducer
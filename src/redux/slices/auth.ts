import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { DataStatus } from './roomsSlice'
import axios from 'axios'


interface UserType {
    login: string,
    password: string,
    email: string
}
interface StateType {
    user: UserType | null,
    status: DataStatus.FAILED | DataStatus.SUCCESS | DataStatus.LOADING
}
const initialState: StateType = {
    user: null,
    status: DataStatus.LOADING
}
const fetchAuth = createAsyncThunk<UserType, void>('auth/fetchSlice', async () => {
    const { data } = await axios.get<UserType>('https://0175150936641c7d.mokky.dev/users')

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
                state.user = null
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.status = DataStatus.SUCCESS
                state.user = action.payload
            })
            .addCase(fetchAuth.rejected, (state) => {
                state.status = DataStatus.FAILED
                state.user = null
            })
    }
})

export default authSlice.reducer
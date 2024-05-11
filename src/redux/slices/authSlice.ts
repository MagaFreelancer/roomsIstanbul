import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { DataStatus } from './roomsSlice';
import { RootState } from '../store';
import axios from '../../axios';

export interface UserAuth {
    email: string;
    password: string | number;
}
export type UserType = {
    email: string;
    id: string | number;
    login: string;
    imageUrl: string;
}
export interface DataUserType {
    token: string;
    data: UserType;
}

interface StateType {
    data: DataUserType | null;
    status: DataStatus.FAILED | DataStatus.SUCCESS | DataStatus.LOADING;
}
const initialState: StateType = {
    data: JSON.parse(localStorage.getItem('data') || 'null') || null,
    status: DataStatus.LOADING
}
export const fetchAuth = createAsyncThunk<DataUserType, UserAuth>('auth/fetchSlice',
    async (params) => {
        const { data } = await axios.post<DataUserType>(
            '/auth',
            params
        )
        console.log(data);
        
        return data
    })

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuth.pending, (state) => {
                state.status = DataStatus.LOADING;
                state.data = null;
            })
            .addCase(fetchAuth.fulfilled, (state, action: PayloadAction<DataUserType>) => {
                state.status = DataStatus.SUCCESS;
                state.data = action.payload;
            })
            .addCase(fetchAuth.rejected, (state) => {
                state.status = DataStatus.FAILED;
                state.data = null;
            })
    }
})
export const selectAuth = (state: RootState) => Boolean(state.authSlice.data)
export const selectAuthData = (state: RootState) => state.authSlice.data
export const selectAuthS = (state: RootState) => state.authSlice

export const { logout } = authSlice.actions;
export default authSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"; // PayloadAction 
import axios from '../../axios';
import { DataStatus } from './roomsSlice.ts';
import { DataUserType } from "./authSlice.ts";
export const fetchRegister = createAsyncThunk<DataUserType, RegisterType>('register/fetchSlice',
    async (params) => {
        const { data } = await axios.post<DataUserType>(
            '/register',
            params
        )

        return data
    })
export type RegisterType = {
    login: string
    password: string | number
    email: string
    imageUrl: string
    id: string
}
type StateType = {
    data: DataUserType | null
    status: DataStatus.FAILED | DataStatus.SUCCESS | DataStatus.LOADING;
}
const initialState: StateType = {
    data: JSON.parse(localStorage.getItem('data') || 'null') || null,
    status: DataStatus.LOADING
}

const RegisterSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRegister.pending, (state) => {
                state.status = DataStatus.LOADING;
                state.data = null;
            })
            .addCase(fetchRegister.fulfilled, (state, action: PayloadAction<DataUserType>) => {
                state.status = DataStatus.SUCCESS;
                state.data = action.payload;
            })
            .addCase(fetchRegister.rejected, (state) => {
                state.status = DataStatus.FAILED;
                state.data = null;
            })
    }
})
export default RegisterSlice.reducer
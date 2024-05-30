import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { DataStatus } from '../../common/types/rooms'
import { ISingleState } from '../../common/types/singlePage';
import { fetchSingle } from '../thunk/single';

const initialState: ISingleState = {
    singleRoom: {
        id: 0,
        name: "",
        price: 0,
        capacity: 0,
        square: "",
        address: "",
        imageUrl: "",
        info: [
            "",

        ],
        imgs: [
            "",
        ]
    },
    status: DataStatus.LOADING
}

const singleRooms = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSingle.pending, (state) => {
                state.status = DataStatus.LOADING
            })
            .addCase(fetchSingle.fulfilled, (state, action) => {
                state.status = DataStatus.SUCCESS
                state.singleRoom = action.payload
            })
            .addCase(fetchSingle.rejected, (state) => {
                state.status = DataStatus.FAILED
            })
    }
})
export const selectSingle = (state: RootState) => state.singleRoom
export default singleRooms.reducer
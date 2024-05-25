import { createSlice } from '@reduxjs/toolkit' //PayloadAction
import { RootState } from '../store'
import { DataStatus, StateType} from '../../common/types/rooms'
import { fetchRooms } from "../thunk/rooms";


const initialState: StateType = {
	items: [],
	status: DataStatus.LOADING
}

const roomsSlice = createSlice({
	name: 'rooms',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRooms.pending, (state) => {
				state.status = DataStatus.LOADING
				state.items = []
			})
			.addCase(fetchRooms.fulfilled, (state, action) => {
				state.status = DataStatus.SUCCESS
				state.items = action.payload
			})
			.addCase(fetchRooms.rejected, (state) => {
				state.status = DataStatus.FAILED
				state.items = []
			})
	}
})
export const selectRooms = (state: RootState) => state.rooms
export default roomsSlice.reducer
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' //PayloadAction
import axios from 'axios'
import { RootState } from '../store'

export enum DataStatus {
	LOADING = "loading",
	SUCCESS = "success",
	FAILED = "failed"
}
export interface DataType {
	id: number,
	name: string,
	price: number,
	couch: number,
	table: number,
	address: string,
	imageUrl: string
}
type StateType = {
	items: DataType[],
	// status: string,
	status: DataStatus.LOADING | DataStatus.SUCCESS | DataStatus.FAILED
}
export const fetchRooms = createAsyncThunk<DataType[], void>(
	'rooms/fetchRooms',
	async () => {
	const { data } = await axios.get<DataType[]>('https://0175150936641c7d.mokky.dev/rooms');
	return data
}
)


const initialState:StateType = {
	items: [],
	status: DataStatus.LOADING
}


const roomsSlice  = createSlice({
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
export const selectRooms = (state: RootState) => state.roomsSlice
export default roomsSlice.reducer
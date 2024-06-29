import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { DataStatus, StateType } from '../../common/types/rooms'
import { fetchPatchRooms, fetchRooms } from "../thunk/rooms";
import { fetchAllRooms } from '../thunk/allRooms';


const initialState: StateType = {
	items: [],
	searchValue: '',
	minmaxPrice: [450, 850],
	square: [
		{
			value: '10.6',
			checked: false,
			id: 0
		},
		{
			value: '10.7',
			checked: false,
			id: 1
		},
		{
			value: '11.9',
			checked: false,
			id: 2
		},
	],
	capacity: [
		{
			value: 1,
			id: 0,
			checked: false
		},
		{
			value: 2,
			id: 1,
			checked: false
		}, {
			value: 3,
			id: 2,
			checked: false
		},
	],
	status: DataStatus.LOADING
}

const roomsSlice = createSlice({
	name: 'rooms',
	initialState,
	reducers: {
		setSearchValue: (state, action) => {
			state.searchValue = action.payload
		},
		setMinmaxPrice: (state, action) => {
			state.minmaxPrice = action.payload
		},
		setSquare: (state, action) => {
			state.square = action.payload
		},
		setCapacity: (state, action) => {
			state.capacity = action.payload
		}
	},
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
			.addCase(fetchAllRooms.pending, (state) => {
				state.status = DataStatus.LOADING
				state.items = []
			})
			.addCase(fetchAllRooms.fulfilled, (state, action) => {
				state.status = DataStatus.SUCCESS
				state.items = action.payload
			})
			.addCase(fetchAllRooms.rejected, (state) => {
				state.status = DataStatus.FAILED
				state.items = []
			})
			.addCase(fetchPatchRooms.pending, (state) => {
				state.status = DataStatus.LOADING
				state.items = []
			})
			.addCase(fetchPatchRooms.fulfilled, (state, action) => {
				state.status = DataStatus.SUCCESS
				state.items = action.payload
			})
			.addCase(fetchPatchRooms.rejected, (state) => {
				state.status = DataStatus.FAILED
				state.items = []
			})
	}
})
export const selectRooms = (state: RootState) => state.rooms
export const { setSearchValue, setMinmaxPrice, setSquare, setCapacity } = roomsSlice.actions
export default roomsSlice.reducer
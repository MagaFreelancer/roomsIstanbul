import { configureStore } from '@reduxjs/toolkit'
import roomsSlice from './slices/roomsSlice'
import authSlice from './slices/authSlice'
export const store = configureStore({
	reducer: {
		rooms: roomsSlice,
		auth: authSlice
	},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store

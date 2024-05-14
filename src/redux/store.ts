import { configureStore } from '@reduxjs/toolkit'
import roomsSlice from './slices/roomsSlice'
import authSlice from './slices/auth'
export const store = configureStore({
	reducer: {
		roomsSlice,
		auth: authSlice
	}
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store

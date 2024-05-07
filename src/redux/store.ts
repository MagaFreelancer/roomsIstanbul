import { configureStore } from '@reduxjs/toolkit'
import roomsSlice from './slices/roomsSlice'
import authSlice from './slices/authSlice'
import { useDispatch} from 'react-redux'

export const store = configureStore({
	reducer: {
		roomsSlice,
		authSlice,
	}
})

export type RootState = ReturnType<typeof store.getState>


type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() 

import { configureStore } from '@reduxjs/toolkit'
import roomsSlice from './slices/roomsSlice'
import AuthSlice from './slices/auth'
import { useDispatch} from 'react-redux'

export const store = configureStore({
	reducer: {
		roomsSlice,
		AuthSlice,
	}
})
export type RootState = ReturnType<typeof store.getState>


type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() 

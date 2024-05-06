import { configureStore } from '@reduxjs/toolkit'
import roomsSlice from './slices/roomsSlice'
import { useDispatch} from 'react-redux'

export const store = configureStore({
	reducer: {
		roomsSlice,
	}
})
export type RootState = ReturnType<typeof store.getState>


type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() 

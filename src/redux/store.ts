import { configureStore } from '@reduxjs/toolkit'
import roomsSlice from './slices/roomsSlice'
import authSlice from './slices/auth'
export const store = configureStore({
	reducer: {
		roomsSlice,
		auth: authSlice
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// Игнорируем пути, которые могут содержать не сериализуемые значения
				ignoredActionPaths: ['payload.headers', 'payload.config', 'payload.request'],
				ignoredPaths: ['auth.data'], // Если нужно игнорировать в состоянии
			},
		}),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store

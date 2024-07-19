import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../modules/auth'
import { likedCustomersSlice } from '../modules/customers'
import { baseApi } from '../shared/lib/api'
import { listenerMiddleware } from '../shared/lib/redux'

export const extraArgument = {}

export const store = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer,
		[likedCustomersSlice.reducerPath]: likedCustomersSlice.reducer,
		[authSlice.reducerPath]: authSlice.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({ thunk: { extraArgument } })
			.prepend(listenerMiddleware.middleware)
			.concat([baseApi.middleware]),
})

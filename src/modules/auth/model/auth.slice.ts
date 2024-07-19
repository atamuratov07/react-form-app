import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { startAppListening } from '../../../shared/lib/redux'
import { initLocalStorage } from '../../../shared/lib/utils'
import { FormData as AuthData } from './types'

const { setValue: setToLS, readValue: getFromLS } = initLocalStorage<AuthState>(
	'user_authorization',
	{
		isAuthorized: false,
		userData: null,
	},
	{
		initializeWithValue: false,
	}
)
export type AuthState = {
	isAuthorized: boolean
	userData: AuthData | null
}
const initialAuthState: AuthState = getFromLS()

export const authSlice = createSlice({
	name: 'auth',
	initialState: initialAuthState,
	selectors: {
		isAuthorized: (state: AuthState) => state.isAuthorized,
		userData: (state: AuthState) => state.userData,
	},
	reducers: {
		setAuth: (state, action: PayloadAction<AuthData>) => {
			state.isAuthorized = true
			state.userData = action.payload
		},
		cancelAuth: state => {
			state.isAuthorized = false
			state.userData = null
		},
	},
})

startAppListening({
	actionCreator: authSlice.actions.setAuth,
	effect: ({ payload }, listenerApi) => {
		console.log(listenerApi.getState().auth)
		setToLS({ isAuthorized: true, userData: payload })
	},
})
startAppListening({
	actionCreator: authSlice.actions.cancelAuth,
	effect: () => {
		setToLS({ isAuthorized: false, userData: null })
	},
})

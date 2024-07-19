import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { startAppListening } from '../../../shared/lib/redux'
import { initLocalStorage } from '../../../shared/lib/utils'
import { CustomerId } from './types'

export type LikedCustomers = Record<CustomerId, boolean>

export const { setValue: setToLS, readValue: getFromLS } =
	initLocalStorage<LikedCustomers>(
		'liked_customers',
		{},
		{
			initializeWithValue: false,
		}
	)

const initialLikedCustomersState: LikedCustomers = getFromLS()

export const likedCustomersSlice = createSlice({
	name: 'likedCustomers',
	initialState: initialLikedCustomersState,
	selectors: {
		customerLiked: (state: LikedCustomers, id: CustomerId): boolean =>
			!!state[id],
		allCustomersLiked: state => state,
	},
	reducers: {
		likeToggled: (state, action: PayloadAction<CustomerId>) => {
			const id = action.payload
			state[id] = !state[id]
		},
	},
})

startAppListening({
	actionCreator: likedCustomersSlice.actions.likeToggled,
	effect: (_, { getState }) => {
		const newState = likedCustomersSlice.selectors.allCustomersLiked(
			getState()
		)
		setToLS({ ...getFromLS(), ...newState })
	},
})

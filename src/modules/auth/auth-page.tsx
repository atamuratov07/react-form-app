import { Navigate } from 'react-router-dom'
import { authSlice } from '.'
import { useAppDispatch, useAppSelector } from '../../shared/lib/redux'
import { AuthForm } from './auth-form'

export function AuthPage() {
	const dispatch = useAppDispatch()
	const isAuthorized = useAppSelector(state =>
		authSlice.selectors.isAuthorized(state)
	)

	if (isAuthorized) return <Navigate to={'/'} />

	return (
		<div className='w-full min-h-screen flex justify-center pt-[20vmin]'>
			<AuthForm
				submitHandler={userData => {
					dispatch(authSlice.actions.setAuth(userData))
				}}
			/>
		</div>
	)
}

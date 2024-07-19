import { Navigate, Outlet } from 'react-router-dom'
import { StickyHeader } from '../features/header'
import { authSlice } from '../modules/auth'
import { useAppSelector } from '../shared/lib/redux'

export function Root() {
	const isAuth = useAppSelector(state =>
		authSlice.selectors.isAuthorized(state)
	)

	if (!isAuth) return <Navigate to={'/login'} />

	return (
		<>
			<StickyHeader />
			<main className=''>
				<Outlet />
			</main>
		</>
	)
}

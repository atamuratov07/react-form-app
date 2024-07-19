import { Navigate, createHashRouter } from 'react-router-dom'
import { AuthPage } from '../modules/auth'
import { CustomerPage, CustomersPage } from '../modules/customers'
import { Root } from './Root'

export const router = createHashRouter([
	{
		path: 'login',
		element: <AuthPage />,
	},
	{
		path: '/',
		element: <Navigate to='/customers' />,
	},
	{
		element: <Root />,
		children: [
			{ path: 'customers', element: <CustomersPage /> },
			{ path: '/customers/:customerId', element: <CustomerPage /> },
		],
	},
])

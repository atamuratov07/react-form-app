import { baseApi } from '../../../shared/lib/api'
import { Customer, Customers } from './types'

type CustomersListQueryParams = { page: number; limit?: number }

export const customersApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		customersList: builder.query<Customers, CustomersListQueryParams>({
			query: ({ page, limit = 4 }) => ({
				url: '/customers',
				params: {
					_page: page,
					_per_page: limit,
				},
			}),
		}),
		singleCustomer: builder.query<Customer, string>({
			query: id => `/customers/${id}`,
		}),
	}),
	overrideExisting: true,
})

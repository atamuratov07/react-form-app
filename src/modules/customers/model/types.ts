export type CustomerId = string

export interface Customer {
	id: CustomerId
	email: string
	phone: string
	about: string
	position: string
	first_name: string
	last_name: string
	avatar: string
}

export interface ResponseWithPagination<T> {
	first: number
	last: number
	next: number | null
	prev: number | null
	items: number
	pages: number
	data: T[]
}

export interface Customers extends ResponseWithPagination<Customer> {}

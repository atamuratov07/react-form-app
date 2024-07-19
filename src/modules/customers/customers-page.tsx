import { skipToken } from '@reduxjs/toolkit/query'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Pagination } from '../../features/pagination'
import { CustomersGrid } from './customers-grid'
import { customersApi } from './model/api'

export function CustomersPage() {
	const [params, setParams] = useSearchParams()

	const pageQuery = params.get('page')
	const { data: customers, isLoading } = customersApi.useCustomersListQuery(
		pageQuery ? { page: +pageQuery } : skipToken
	)

	useEffect(() => {
		pageQuery ?? setParams({ page: '1' })
	}, [])

	return (
		<section>
			<header className='py-16 px-5 bg-violet text-white'>
				<div className='max-w-[846px] w-full text-center mx-auto space-y-4'>
					<h1 className='text-5xl md:text-6xl'>Наша команда</h1>
					<p className='text-xl'>
						Это опытные специалисты, хорошо разбирающиеся во всех задачах,
						которые ложатся на их плечи, и умеющие находить выход из
						любых, даже самых сложных ситуаций.{' '}
					</p>
				</div>
			</header>
			{customers && (
				<Pagination
					currentPage={Number(pageQuery) ?? 1}
					totalPages={customers.pages}
					firstPage={customers.first}
					lastPage={customers.last}
					onPageChange={page => {
						setParams({ page: String(page) })
					}}
					className='justify-center py-10'
				/>
			)}
			<div className='container py-8 md:pt-12 md:pb-16'>
				<CustomersGrid customers={customers?.data} isLoading={isLoading} />
			</div>
		</section>
	)
}

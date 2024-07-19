import { skipToken } from '@reduxjs/toolkit/query'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../shared/components/button'
import { Icon } from '../../shared/components/icon'
import Thumbnail from '../../shared/components/thumbnail'
import { customersApi } from './model/api'

export function CustomerPage() {
	const { customerId: id } = useParams()
	const { data: customer, isLoading } = customersApi.useSingleCustomerQuery(
		id ?? skipToken
	)
	const navigate = useNavigate()
	const onBackButtonClick = () => {
		navigate(-1)
	}

	if (isLoading) return <Thumbnail>Loading...</Thumbnail>
	if (!customer) return <Thumbnail>Customer not found</Thumbnail>

	return (
		<article>
			<header className='bg-violet'>
				<div className='container lg:flex justify-start'>
					<div className='basis-28 inline-block relative z-10 py-3 md:py-8'>
						<Button
							onClick={onBackButtonClick}
							variant='outline-light'
							size='sm'
							className='hidden sm:block'
						>
							Назад
						</Button>
						<button
							onClick={onBackButtonClick}
							type='button'
							className='sm:hidden flex justify-center items-center rounded-md w-10 aspect-square hover:bg-purple-800 transition-colors'
						>
							<Icon
								name='arrow-left'
								width='14'
								className='text-white'
							/>
						</button>
					</div>
					<div className='pb-16 lg:py-10 flex flex-col-reverse lg:flex-row items-center gap-x-8 gap-y-4'>
						<img
							src={customer.avatar}
							alt='Customer Avatar'
							width='187'
							height='187'
							className='aspect-square rounded-full object-cover overflow-hidden'
						/>
						<div className='text-center lg:text-start space-y-4 text-white'>
							<h1 className='text-5xl md:text-6xl'>
								{[customer.first_name, customer.last_name].join(' ')}
							</h1>
							<p className='text-2xl md:text-3xl'>{customer.position}</p>
						</div>
					</div>
				</div>
			</header>
			<div className='container py-8 md:py-12 flex flex-col gap-y-8 gap-x-[calc(130/1280*100%)] lg:flex-row-reverse'>
				<div>
					<ul className='space-y-4'>
						<li>
							<a
								href={`mailto:${customer.email}`}
								className='flex flex-nowrap gap-x-2 items-center'
							>
								<Icon
									name='mail'
									width='20'
									className='stroke-violet  text-violet'
								/>
								{customer.email}
							</a>
						</li>
						<li>
							<a
								href={`tel:${customer.phone}`}
								className='flex flex-nowrap gap-x-2 items-center'
							>
								<Icon
									name='phone'
									width='20'
									className='stroke-violet text-white'
								/>
								{customer.phone}
							</a>
						</li>
					</ul>
				</div>
				<div className='lg:ml-28 max-w-[630/1280*100%] w-full'>
					<p>{customer.about}</p>
				</div>
			</div>
		</article>
	)
}

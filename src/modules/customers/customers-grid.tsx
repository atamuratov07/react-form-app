import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../shared/lib/redux'
import { cn } from '../../shared/lib/utils'
import { Icon } from '../../shared/ui/icon'
import Thumbnail from '../../shared/ui/thumbnail'
import { likedCustomersSlice } from './model/likedCustomers.slice'
import { Customer, CustomerId } from './model/types'

export function CustomersGrid({
	customers,
	isLoading,
}: {
	customers?: Customer[]
	isLoading: boolean
}) {
	const navigate = useNavigate()

	const handleCustomerCardClick = (id: CustomerId) => {
		navigate(`${id}`)
	}

	if (isLoading) {
		return <Thumbnail>Loading...</Thumbnail>
	}

	if (!customers || customers.length === 0) {
		return <Thumbnail>No customers :(</Thumbnail>
	}
	return (
		<ul className='grid grid-cols-[repeat(auto-fill,_minmax(300px,1fr))] gap-5'>
			{customers.map(customer => (
				<li key={customer.id}>
					<CustomersCard
						customer={customer}
						onClick={handleCustomerCardClick}
					/>
				</li>
			))}
		</ul>
	)
}

interface CustomerCardProps {
	customer: Customer
	onClick: (id: CustomerId) => void
}

function CustomersCard({ customer, onClick }: CustomerCardProps) {
	const isLiked = useAppSelector(state =>
		likedCustomersSlice.selectors.customerLiked(state, customer.id)
	)

	const dispatch = useAppDispatch()
	const onLikeClick = () => {
		dispatch(likedCustomersSlice.actions.likeToggled(customer.id))
	}
	return (
		<article
			role='link'
			key={customer.id}
			onClick={() => onClick(customer.id)}
			className={cn(
				'p-5 pt-9 rounded-xl flex flex-col items-center gap-y-4 cursor-pointer',
				'shadow-[0_1px_3px_0_rgba(0,0,0,0.2)] transition-shadow hover:shadow-[0_1px_10px_0_rgba(0,0,0,0.3)]',
				'focus-within:outline-2 focus-within:outline-offset-0 focus-within:outline focus-within:outline-black'
			)}
		>
			<img
				src={customer.avatar}
				alt='Customer Avatar'
				width='124'
				height='124'
				className='aspect-square w-1/2 rounded-full object-cover'
			/>
			<a
				href={`customers/${customer.id}`}
				onClick={e => {
					e.preventDefault()
				}}
				className='text-xl'
			>
				{customer.first_name} {customer.last_name}
			</a>
			<div className='flex justify-end w-full'>
				<button
					type='button'
					onClick={e => {
						e.stopPropagation()
						onLikeClick()
					}}
					className='inline-block p-4 md:p-2 rounded-[4px] bg-gray-light hover:bg-neutral-300 transition-colors'
				>
					<Icon
						width={16}
						name='like'
						className={cn(
							'text-transparent stroke-black w-7 md:w-4 h-7 md:h-4',
							{
								'text-violet stroke-violet': isLiked,
							}
						)}
					/>
				</button>
			</div>
		</article>
	)
}

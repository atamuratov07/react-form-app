import { useMemo } from 'react'
import { cn } from '../../shared/lib/utils'
import { Icon } from '../../shared/ui/icon'
import { generatePagination } from './generate-pagination'

interface PaginationProps {
	totalPages: number
	currentPage: number
	firstPage?: number
	lastPage?: number
	className?: string
	onPageChange: (page: number) => void
}

export function Pagination({
	totalPages,
	className = '',
	currentPage,
	lastPage,
	firstPage,
	onPageChange,
}: PaginationProps) {
	const isFirst = currentPage === (firstPage ?? totalPages)
	const isLast = currentPage === (lastPage ?? totalPages)
	const allPages = useMemo(
		() => generatePagination(currentPage, lastPage ?? totalPages),
		[currentPage, lastPage, totalPages]
	)

	return (
		<div className={cn('flex items-center gap-x-2 md:gap-x-4', className)}>
			<PaginationArrow
				isLeft
				isDisabled={isFirst}
				onClick={() => onPageChange(currentPage - 1)}
			/>
			<ul className='flex border-collapse select-none rounded-md border border-purple-300'>
				{allPages.map((page, i) => {
					const itemProps = {
						page,
						isActive: currentPage === page,
						...(typeof page === 'number' && { onClick: onPageChange }),
					}

					return <PaginationItem key={i} {...itemProps} />
				})}
			</ul>

			<PaginationArrow
				isDisabled={isLast}
				onClick={() => onPageChange(currentPage + 1)}
			/>
		</div>
	)
}

interface PaginationItemProps {
	page: number | string
	isActive: boolean
	onClick?: (page: number) => void
}

function PaginationItem({ page, isActive, onClick }: PaginationItemProps) {
	const isLink = onClick !== undefined
	const className = cn(
		'flex h-10 w-10 items-center justify-center text-violet transition-colors',
		{
			'relative z-[5] bg-violet text-white': isActive,
			'hover:bg-purple-100': !isActive && isLink,
			'text-gray': !isLink,
		}
	)

	return (
		<li
			className={cn(
				'border-l border-purple-300 first:border-none first:rounded-l-md last:rounded-r-md overflow-hidden',
				{ ' border-violet': isActive }
			)}
		>
			{!isLink || isActive ? (
				<div className={className}>{page}</div>
			) : (
				<a
					href=''
					onClick={e => {
						e.preventDefault()
						onClick(Number(page))
					}}
					className={className}
				>
					{page}
				</a>
			)}
		</li>
	)
}

interface PaginationArrowProps {
	onClick: () => void
	isDisabled: boolean
	isLeft?: boolean
}

function PaginationArrow({
	onClick,
	isDisabled,
	isLeft,
}: PaginationArrowProps) {
	const className = cn(
		'flex h-10 w-10 items-center justify-center rounded-md border',
		{
			'pointer-events-none text-gray cursor-not-allowed border-gray-300':
				isDisabled,
			'text-violet border-purple-800 hover:bg-purple-100 active:bg-violet active:text-white':
				!isDisabled,
			'rotate-180': !isLeft,
		}
	)
	return (
		<a
			href=''
			className={className}
			onClick={e => {
				e.preventDefault()
				onClick()
			}}
		>
			<Icon name='arrow-left' width='16' />
		</a>
	)
}

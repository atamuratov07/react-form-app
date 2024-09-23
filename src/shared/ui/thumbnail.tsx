import { cn } from '../lib/utils'

export default function Thumbnail({
	className = '',
	children,
}: {
	className?: string
	children: React.ReactNode
}) {
	return (
		<div
			className={cn('w-full py-20 flex justify-center text-3xl', className)}
		>
			{children}
		</div>
	)
}

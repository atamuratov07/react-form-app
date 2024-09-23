import { cn } from '../lib/utils'

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'outline-dark' | 'outline-light' | 'default'
	disabled?: boolean
	size?: 'sm' | 'lg'
}

export function Button({
	children,
	className,
	disabled,
	variant = 'default',
	size = 'sm',
	...props
}: ButtonProps) {
	return (
		<button
			type='button'
			disabled={disabled}
			{...props}
			className={cn(
				'rounded-lg text-white flex justify-center items-center transition-colors focus:outline-dashed focus:outline-[3px] focus:outline-black focus:outline-offset-2',
				{
					'bg-violet active:bg-purple-600': variant === 'default',
					'opacity-50 cursor-not-allowed pointer-events-none': disabled,
					'border border-solid border-white hover:bg-white hover:text-violet active:bg-white active:text-violet':
						variant === 'outline-light',

					'border border-solid border-black text-black hover:bg-black hover:text-white active:bg-black active:text-white':
						variant === 'outline-dark',
					'py-[13px]': size === 'lg',
					'py-2 px-4': size === 'sm',
				},
				className
			)}
		>
			{children}
		</button>
	)
}

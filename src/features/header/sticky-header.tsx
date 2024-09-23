import { authSlice } from '../../modules/auth'
import { useAppDispatch } from '../../shared/lib/redux'
import { cn } from '../../shared/lib/utils'
import { Button } from '../../shared/ui/button'
import { Icon } from '../../shared/ui/icon'
import { useHeaderTranslate } from './model/useHeaderTranslate'

export function StickyHeader() {
	const { headerShown, headerReduced } = useHeaderTranslate(200)
	const dispatch = useAppDispatch()

	return (
		<header
			className={cn(
				'fixed z-auto top-0 left-0 py-3 md:py-8 w-full text-white transition-all duration-500',
				{
					'z-50 bg-white py-2 md:py-4': headerReduced,
					'shadow-[0_0_5px_5px_rgba(0,0,0,0.2)]':
						headerShown && headerReduced,
					'-translate-y-full': !headerShown,
				}
			)}
		>
			<nav className='container flex justify-end'>
				<div className='relative z-50'>
					<Button
						variant={headerReduced ? 'outline-dark' : 'outline-light'}
						size='sm'
						className={cn('hidden sm:block', {})}
						onClick={() => dispatch(authSlice.actions.cancelAuth())}
					>
						Выход
					</Button>
					<button
						type='button'
						className='sm:hidden flex justify-center items-center rounded-md w-10 aspect-square hover:bg-purple-800 transition-colors group/button'
					>
						<Icon
							name='exit'
							width='20'
							className={cn({
								'text-violet group-hover/button:text-white':
									headerReduced,
							})}
						/>
					</button>
				</div>
			</nav>
		</header>
	)
}

import { cn } from '../lib/utils'
import iconsSpritePath from '/src/assets/icons/sprite.svg'

export type IconName =
	| 'like'
	| 'arrow-down'
	| 'exit'
	| 'arrow-left'
	| 'phone'
	| 'mail'
export type IconProps = React.SVGProps<SVGSVGElement> & { name: IconName }

export function Icon({ name, width, height, className, ...props }: IconProps) {
	const iconFullPath = `${iconsSpritePath}#${
		import.meta.env.VITE_ICONS_PREFIX
	}${name}`

	return (
		<svg
			width={width ?? height}
			height={height ?? width}
			className={cn('transition-colors aspect-square', className)}
			{...props}
		>
			<use href={iconFullPath} />
		</svg>
	)
}

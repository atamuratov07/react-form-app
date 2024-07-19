import { useLayoutEffect, useState } from 'react'

export function useWindowScroll(): {
	current: number
	prev: number
	diff: number
} {
	const [scroll, setScroll] = useState<{
		current: number
		prev: number
		diff: number
	}>({
		current: 0,
		prev: 0,
		diff: 0,
	})

	useLayoutEffect(() => {
		const handleScroll = () => {
			const newScroll = Number.parseInt(window.scrollY.toFixed(1))

			setScroll(prev => ({
				current: newScroll,
				prev: prev.current,
				diff: newScroll - prev.current,
			}))
		}

		handleScroll()
		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])
	return scroll
}

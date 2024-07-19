import { useEffect, useRef, useState } from 'react'

export const useHeaderTranslate: (
	shrinkHeaderScroll?: number,
	growHeaderScroll?: number,
	scrollShowDelay?: number
) => {
	headerShown: boolean
	headerReduced: boolean
} = (reduceHeaderScroll = 100, increaseHeaderScroll = 50) => {
	const [headerShown, setHeaderShown] = useState(true)
	const [headerReduced, setHeaderReduced] = useState(false)
	const prevScrollRef = useRef<number | null>(null)
	useEffect(() => {
		const handleScroll = () => {
			let newScroll = Number.parseFloat(window.scrollY.toFixed(5))
			let prevScroll = prevScrollRef.current ?? newScroll
			const isScrollLower = newScroll < prevScroll

			setHeaderShown(newScroll === prevScroll || isScrollLower)

			if (newScroll > reduceHeaderScroll) setHeaderReduced(true)
			if (isScrollLower && newScroll < increaseHeaderScroll) {
				setHeaderReduced(false)
			}

			prevScrollRef.current = newScroll
		}

		handleScroll()
		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return {
		headerShown,
		headerReduced,
	}
}

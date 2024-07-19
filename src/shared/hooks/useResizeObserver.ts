import { useEffect, useState, type RefObject } from 'react'

type UseMeasure = <T extends HTMLElement>(
	ref: RefObject<T | null>
) => {
	width: number
	height: number
}
export const useMeasure: UseMeasure = ref => {
	const [dimensions, setDimensions] = useState<{
		width: number
		height: number
	}>({
		width: 0,
		height: 0,
	})

	useEffect(() => {
		if (ref.current !== null) {
			setDimensions({
				width: ref.current.offsetWidth,
				height: ref.current.offsetHeight,
			})
			const observer = new ResizeObserver(([entry]) => {
				if (entry && entry.borderBoxSize) {
					const { inlineSize: width, blockSize: height } =
						entry.borderBoxSize[0]

					setDimensions({ width, height })
				}
			})

			observer.observe(ref.current)
		}
	}, [ref.current])

	return dimensions
}

'use client'
import { useState } from "react"

export default function StarRating({
	initialRating = 0,
	onClick,
	emptySymbol,
	fullSymbol,
	fractions = 1,
	max = 5,
}) {
	const [hovered, setHovered] = useState(null)

	// Calculate rating in fractions (e.g., 3.5)
	const getFill = (index) => {
		const rating = hovered ?? initialRating
		if (rating >= index + 1) return 1
		if (rating > index && rating < index + 1) return rating - index
		return 0
	}

	const handleMouseMove = (e, index) => {
		if (fractions === 1) return
		const { left, width } = e.currentTarget.getBoundingClientRect()
		const percent = (e.clientX - left) / width
		const fractionStep = 1 / fractions
		const newHovered = index + Math.ceil(percent / fractionStep) * fractionStep
		setHovered(parseFloat(newHovered.toFixed(2)))
	}

	const handleClick = (index) => {
		const rating = hovered ?? index + 1
		onClick?.(parseFloat(rating.toFixed(2)))
	}

	return (
		<div className="flex gap-1">
			{[...Array(max)].map((_, i) => {
				const fill = getFill(i)

				return (
					<span
						key={i}
						className="relative w-6 h-6 cursor-pointer"
						onMouseEnter={() => setHovered(i + 1)}
						onMouseMove={(e) => handleMouseMove(e, i)}
						onMouseLeave={() => setHovered(null)}
						onClick={() => handleClick(i)}
					>
						<div className="absolute top-0 left-0 w-full h-full">
							{emptySymbol}
						</div>
						<div
							className="absolute top-0 left-0 h-full overflow-hidden"
							style={{ width: `${fill * 100}%` }}
						>
							{fullSymbol}
						</div>
					</span>
				)
			})}
		</div>
	)
}

'use client'

import { DocsLayout } from '@/components/landing/layout/docs'
import { docsSections } from '@/components/landing/layout/docs/docsSections'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useState } from 'react'

export default function DocsPage() {
	const [currentIndex, setCurrentIndex] = useState(0)

	const CurrentSection = docsSections[currentIndex].Component

	const goPrev = () => {
		setCurrentIndex((i) => Math.max(i - 1, 0))
	}

	const goNext = () => {
		setCurrentIndex((i) => Math.min(i + 1, docsSections.length - 1))
	}

	const prevSection = docsSections[currentIndex - 1]
	const nextSection = docsSections[currentIndex + 1]

	return (
		<DocsLayout currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}>
			<div>
				<h1 className="text-2xl font-bold mb-4">{docsSections[currentIndex].title}</h1>
				<CurrentSection />
			</div>
			<div className="flex justify-between mt-8">
				<button
					onClick={goPrev}
					disabled={currentIndex === 0}
					className="btn-primary disabled:opacity-50 flex items-center gap-3"
				>
					<ArrowLeft className="w-5 h-5" />
					<div className="flex flex-col items-start leading-tight">
						<span className="text-xs text-muted-foreground">Previous</span>
						<span className="font-medium truncate max-w-xs">{prevSection?.title || ''}</span>
					</div>
				</button>

				<button
					onClick={goNext}
					disabled={currentIndex === docsSections.length - 1}
					className="btn-primary disabled:opacity-50 flex items-center gap-3"
				>
					<div className="flex flex-col items-end leading-tight">
						<span className="text-xs text-muted-foreground">Next</span>
						<span className="font-medium truncate max-w-xs">{nextSection?.title || ''}</span>
					</div>
					<ArrowRight className="w-5 h-5" />
				</button>
			</div>
		</DocsLayout>
	)
}

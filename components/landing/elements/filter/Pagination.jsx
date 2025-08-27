"use client"

import { Button } from "@/components/ui/button"

export default function Pagination({ currentPage, totalPage, setCurrentPage }) {
	const handlePageChange = (newPage) => {
		if (newPage > 0 && newPage <= totalPage) {
			setCurrentPage(newPage)
		}
	}

	return (
		<div className="flex items-center justify-center space-x-4 mt-6">
			<Button
				variant="outline"
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				Previous
			</Button>
			<span>
				Page {currentPage} of {totalPage}
			</span>
			<Button
				variant="outline"
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPage}
			>
				Next
			</Button>
		</div>
	)
}
"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ShowPerPage({ itemsPerPage, setItemsPerPage }) {
	return (
		<>
			<Select
				value={itemsPerPage.toString()} // Ensure the value is a string for Select
				onValueChange={(value) => setItemsPerPage(Number(value))} // Convert back to number
			>
				<SelectTrigger  className="w-[200px]">
					<SelectValue placeholder="Select number of items" />
				</SelectTrigger>
				<SelectContent>
					{[10, 20, 30].map((count) => (
						<SelectItem key={count} value={count.toString()}>
							{count} Items
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</>
	)
}

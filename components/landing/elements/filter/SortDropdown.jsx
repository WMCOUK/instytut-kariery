import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SortDropdown({ onSortChange }) {
	const handleSortChange = (value) => {
		const [sortBy, sortOrder] = value.split("-")
		onSortChange({ sortBy, sortOrder })
	}

	return (
		<div className="flex items-center space-x-2">
			<Select onValueChange={handleSortChange}>
				<SelectTrigger className="w-[200px]">
					<SelectValue placeholder="Sort by" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="title-asc">Name (A-Z)</SelectItem>
					<SelectItem value="title-desc">Name (Z-A)</SelectItem>
					<SelectItem value="minSalary-asc">Salary (Low to High)</SelectItem>
					<SelectItem value="minSalary-desc">Salary (High to Low)</SelectItem>
					<SelectItem value="createdAt-desc">Newest</SelectItem>
					<SelectItem value="createdAt-asc">Oldest</SelectItem>
				</SelectContent>
			</Select>
		</div>
	)
}

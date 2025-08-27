import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SortDropdown({ onSortChange, initialSort }) {
	const handleSortChange = (value) => {
		const [sortBy, sortOrder] = value.split("-")
		onSortChange({ sortBy, sortOrder })
	}

	const initialValue = `${initialSort.sortBy}-${initialSort.sortOrder}`

	return (
		<Select onValueChange={handleSortChange} defaultValue={initialValue}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Sort by" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="createdAt-desc">Newest</SelectItem>
				<SelectItem value="createdAt-asc">Oldest</SelectItem>
				<SelectItem value="title-asc">Title A-Z</SelectItem>
				<SelectItem value="title-desc">Title Z-A</SelectItem>
				<SelectItem value="views-desc">Most Viewed</SelectItem>
				<SelectItem value="views-asc">Least Viewed</SelectItem>
			</SelectContent>
		</Select>
	)
}


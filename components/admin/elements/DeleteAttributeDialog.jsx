'use client'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner" // Assuming you are using sonner for toast notifications

export default function DeleteAttributeDialog({ open, setOpen, slug, attributePath, attributeTitle }) {

	const handleDeleteAttribute = async (slug) => {
		try {
			const response = await fetch(`/api/v1/job/${attributePath}/${slug}`, {
				method: 'DELETE'
			})
			if (!response.ok) {
				throw new Error('Network response was not ok')
			}
			const data = await response.json()
			// console.log(data)
			toast.success(`${attributeTitle} deleted successfully!`)
		} catch (error) {
			console.error('There was a problem with your fetch operation:', error)
		} finally {
			setOpen(false)
		}
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your {attributeTitle}.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>No</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => handleDeleteAttribute(slug)}
					>
						Confirm
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

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
import { fetchAllPost } from "@/fetchSwr"
import { toast } from "sonner" // Assuming you are using sonner for toast notifications

export default function DeleteCandidateDialog({ open, setOpen, id }) {
	const { mutate } = fetchAllPost()

	const handleDeleteRecruiter = async (id) => {
		try {
			const response = await fetch(`/api/v1/candidate/${id}`, {
				method: 'DELETE'
			})
			if (!response.ok) {
				throw new Error('Network response was not ok')
			}
			const data = await response.json()
			console.log(data)
			toast.success('Job deleted successfully!')
		} catch (error) {
			console.error('There was a problem with your fetch operation:', error)
		} finally {
			setOpen(false)
			mutate()
		}
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your recruiter.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>No</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => handleDeleteRecruiter(id)}
					>
						Confirm
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

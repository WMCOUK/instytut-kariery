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

export default function DeleteUserDialog({ open, setOpen, id, mutate }) {

	const handleDeleteUser = async (id) => {
		try {
			const response = await fetch(`/api/v1/user/${id}`, {
				method: 'DELETE'
			})
			if (!response.ok) {
				throw new Error('Network response was not ok')
			}
			const data = await response.json()
			console.log(data)
			toast.success('User deleted successfully!')
			if (typeof mutate === "function") {
				mutate()
			} else {
				console.error("mutate is not a function:", mutate)
			}
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
						This action cannot be undone. This will permanently delete your {id}.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>No</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => handleDeleteUser(id)}
					>
						Confirm
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

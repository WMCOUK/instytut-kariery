"use client"

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
import { useCallback } from "react"
import { toast } from "sonner"

export default function DeleteCandidateEducationDialog({ open, setOpen, slug, attributeTitle }) {
	const handleDeleteAttribute = async (slug) => {
		try {
			const response = await fetch(`/api/v1/candidate/education/${slug}`, {
				method: "DELETE",
			})
			if (!response.ok) {
				throw new Error("Network response was not ok")
			}
			await response.json()
			toast.success(`${attributeTitle} deleted successfully!`)
		} catch (error) {
			console.error("There was a problem with your fetch operation:", error)
			toast.error(`Failed to delete ${attributeTitle}`)
		} finally {
			setOpen(false)
		}
	}

	const handleCancel = useCallback(() => {
		setOpen(false)
	}, [setOpen])

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
					<AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={() => handleDeleteAttribute(slug)}>Delete</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}


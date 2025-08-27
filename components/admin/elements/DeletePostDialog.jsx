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
import { toast } from "sonner"

export default function DeletePostDialog({ open, setOpen, slug, mutate }) {
  const handleDeletePost = async (slug) => {
    try {
      const response = await fetch(`/api/v1/post/${slug}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = await response.json()
      console.log(data)
      toast.success("Post deleted successfully!")
      if (typeof mutate === "function") {
        mutate()
      } else {
        console.error("mutate is not a function:", mutate)
      }
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error)
      toast.error("Failed to delete post")
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
            This action cannot be undone. This will permanently delete your post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeletePost(slug)}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}


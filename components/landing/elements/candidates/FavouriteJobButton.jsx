"use client"

import { Button } from "@/components/ui/button"
import CurrentUserClient from "@/utils/currentUserClient"
import { Heart } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function FavouriteJobButton({ jobTitle, jobSlug, initialFavourite, format }) {
	const [isFavourite, setIsFavourite] = useState(initialFavourite)
	const [loading, setLoading] = useState(false)
	const user = CurrentUserClient()

	const toggleFavourite = async () => {
		if (!user) {
			toast.error("Please log in to manage favourites.")
			return
		}
		if (loading) return

		setLoading(true)
		const newState = !isFavourite
		setIsFavourite(newState) // Optimistic update

		try {
			const res = await fetch("/api/v1/favourite-job", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ jobSlug }),
			})

			if (!res.ok) throw new Error("Failed to update favourite")

			const data = await res.json()
			setIsFavourite(data.isFavourite)

			toast.success(
				data.isFavourite
					? `${jobTitle} added to favourites`
					: `${jobTitle} removed from favourites`
			)
		} catch (err) {
			setIsFavourite(!newState) // revert on error
			toast.error(err.message || "An error occurred")
		} finally {
			setLoading(false)
		}
	}

	const FavouriteIcon = () => (
		<Heart
			fill={user && isFavourite ? "currentColor" : "none"}
			className={`w-4 h-4 transition-all ${isFavourite
					? "text-primary group-hover:text-white"
					: "text-gray-500 group-hover:text-white"
				}`}
		/>
	)

	if (user?.onboard !== "CANDIDATE") return null

	return format === "button" ? (
		<Button variant="outline" size="icon" className="rounded-full">
			<div onClick={toggleFavourite} className="group cursor-pointer">
				<FavouriteIcon />
			</div>
		</Button>
	) : (
		<div onClick={toggleFavourite} className="group cursor-pointer">
			<FavouriteIcon />
		</div>
	)
}

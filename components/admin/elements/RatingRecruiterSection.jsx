"use client"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { fetchRatingRecruiter } from "@/fetchSwr"
import CurrentUserClient from "@/utils/currentUserClient"
import { Check, Star } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import StarRating from "./StarRating"

export default function RatingRecruiterSection({ recruiterSlug, recruiterTitle }) {


	const {
		summary,
		reviews,
		averageRating,
		totalCount,
		mutate,
		isLoading,
		error,
	} = fetchRatingRecruiter(recruiterSlug)

	const [myRating, setMyRating] = useState(0)

	const [avgRating, setAvgRating] = useState(averageRating)
	const [content, setContent] = useState("")
	const [submitting, setSubmitting] = useState(false)
	const currentUser = CurrentUserClient()
	// console.log(currentUser)

	useEffect(() => {
		setAvgRating(averageRating)
	}, [averageRating])

	const handleRating = (value) => setMyRating(value)

	const handleSubmit = async () => {
		if (!myRating) return toast.error("Please select a rating")

		setSubmitting(true)
		try {
			const res = await fetch("/api/v1/rating-recruiter", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					recruiterSlug,
					rating: myRating,
					content,
				}),
			})

			if (!res.ok) throw new Error("Failed to submit review")

			const data = await res.json()
			setAvgRating(data.averageRating)
			toast.success(`Review submitted for "${recruiterTitle}"`)
			setContent("")
			setMyRating(0)
			mutate()
		} catch (err) {
			toast.error(err.message || "Error submitting review")
		} finally {
			setSubmitting(false)
		}
	}

	if (error) return <p className="text-red-500">Failed to load ratings.</p>
	if (isLoading) return <p>Loading ratings...</p>

	return (
		<div className="flex flex-col">
			{/* Summary */}
			<div className="flex flex-col md:flex-row gap-8 items-start mb-8">
				<div className="flex flex-col items-center md:items-start">
					<div className="text-5xl font-bold mb-2">{avgRating.toFixed(1)}</div>
					<div className="flex gap-1 mb-1">
						{[...Array(5)].map((_, i) => (
							<Star
								key={i}
								className={`w-5 h-5 ${i < Math.round(avgRating) ? "fill-primary text-primary" : "text-gray-300"}`}
							/>
						))}
					</div>
					<div className="text-sm text-muted-foreground">({totalCount} Ratings)</div>
				</div>

				<div className="flex-1 space-y-2">
					{summary.map(({ stars, percentage }) => (
						<div key={stars} className="flex items-center gap-2">
							<div className="flex items-center gap-1 w-16">
								<span className="text-sm">{stars}</span>
								<Star className="w-4 h-4 fill-primary text-primary" />
							</div>
							<Progress value={percentage} className="h-2 flex-1 [&>div]:bg-primary" />
							<span className="text-sm text-muted-foreground w-12">{percentage}%</span>
						</div>
					))}
				</div>
			</div>

			{/* Rating Form */}
			<div className="mb-8 space-y-4">
				{currentUser?.onboard == "CANDIDATE" ?
					<>
						<div className="flex items-center gap-2">
							{/* <Rating
								initialRating={myRating}
								onClick={handleRating}
								emptySymbol={<Star className="text-gray-400 w-6 h-6" />}
								fullSymbol={<Star className="text-yellow-400 w-6 h-6 fill-current" />}
								fractions={2}
							/> */}

							<StarRating
								initialRating={myRating}
								onClick={handleRating}
								emptySymbol={<Star className="text-gray-400 w-6 h-6" />}
								fullSymbol={<Star className="text-yellow-400 w-6 h-6 fill-current" />}
								fractions={2}
							/>
							<span className="text-lg font-medium">
								{myRating ? `You rated: ${myRating}/5` : "Rate this recruiter"}
							</span>
						</div>
						<Textarea
							placeholder="Write your review..."
							value={content}
							onChange={(e) => setContent(e.target.value)}
							rows={4}
						/>
						<Button disabled={submitting} onClick={handleSubmit}>
							{submitting ? "Submitting..." : "Submit Review"}
						</Button>
					</>
					:
					<>
						<Link href="/signin">
							<Button>
								Login to submit a review
							</Button>
						</Link>
					</>
				}

			</div>

			<Separator className="mb-8" />

			{/* Review List */}
			<div className="space-y-8">
				{reviews.length === 0 && <p className="text-muted-foreground">No reviews yet.</p>}
				{reviews.map((review) => (
					<div key={review.id}>
						<div className="flex items-start gap-4">
							<Avatar className="w-12 h-12">
								{/* Use real image if available in future */}
								<AvatarImage src={review.image} alt={review.name || review.author} />
							</Avatar>
							<div className="flex-1">
								<div className="flex items-center gap-2 mb-1">
									<h3 className="font-semibold">{review.name || review.author}</h3>
									{review.verified && <Check className="w-4 h-4 text-primary" />}
								</div>
								<div className="text-sm text-muted-foreground mb-1">{review.date}</div>
								<div className="flex gap-1 mb-2">
									{[...Array(Math.round(review.rating))].map((_, i) => (
										<Star key={i} className="w-4 h-4 fill-primary text-primary" />
									))}
								</div>
								<p className="text-sm">{review.content}</p>
							</div>
						</div>
						<Separator className="mt-8" />
					</div>
				))}
			</div>
		</div>

	)
}

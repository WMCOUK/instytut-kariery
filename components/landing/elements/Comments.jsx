'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { baseUrl } from "@/utils/baseUrl"
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2, MessageCircle, Send } from 'lucide-react'
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useState } from 'react'
import { toast } from "sonner"
import useSWR from "swr"

const fetcher = async (url) => {
	const res = await fetch(url)
	const data = await res.json()
	if (!res.ok) {
		const error = new Error(data.message)
		throw error
	}
	return data
}

export default function Comments({ postSlug }) {
	const { data: session, status } = useSession()
	const { data, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/comment?postSlug=${postSlug}`,
		fetcher
	)

	const [desc, setDesc] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault()
		setIsSubmitting(true)

		try {
			await fetch("/api/v1/comment", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ description: desc, postSlug }),
			})
			mutate()
			setDesc("")
			toast.success("Comment posted successfully!")
		} catch (error) {
			toast.error("Failed to post comment.")
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<section className="space-y-8 mx-auto">
			<h2 className="text-3xl font-bold flex items-center gap-3 mb-8">
				<MessageCircle className="h-8 w-8" />
				Comments
			</h2>
			{status === "authenticated" ? (
				<Card className="p-6">
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="flex items-start space-x-4">
							<Avatar className="h-10 w-10">
								<AvatarImage src={session?.user?.personal?.image} alt={session.user?.personal?.name} />
								<AvatarFallback>{session?.user?.personal?.name}</AvatarFallback>
							</Avatar>
							<div className="flex-1">
								<Label htmlFor="comment" className="sr-only">Add a comment</Label>
								<Textarea
									id="comment"
									placeholder="Share your thoughts..."
									required
									value={desc}
									onChange={(e) => setDesc(e.target.value)}
									className="min-h-[100px] text-base resize-none transition-all duration-200 focus:min-h-[150px]"
								/>
							</div>
						</div>
						<div className="flex justify-start">
							<Button
								type="submit"
								className="flex items-center gap-2 px-6"
								disabled={isSubmitting}
							>
								{isSubmitting ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : (
									<Send className="h-4 w-4" />
								)}
								{isSubmitting ? 'Posting...' : 'Post Comment'}
							</Button>
						</div>
					</form>
				</Card>
			) : (
				<Card className="p-8 text-center">
					<h3 className="text-xl font-semibold mb-4">Join the conversation</h3>
					<p className="text-base mb-6 text-muted-foreground">Sign in to share your thoughts and connect with others.</p>
					<Link href="/signin">
						<Button className="text-base px-8 py-2">
							Login to comment
						</Button>
					</Link>
				</Card>
			)}

			<div className="space-y-6">
				{isLoading ? (
					<div className="flex justify-center items-center py-12">
						<Loader2 className="h-8 w-8 animate-spin" />
					</div>
				) : (
					<AnimatePresence>
						{data?.map((item, i) => (
							<motion.div
								key={item.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3, delay: i * 0.1 }}
							>
								<Card className="p-6">
									<div className="flex items-start space-x-4">
										<Avatar className="h-10 w-10">
											<AvatarImage src={item.user?.personal?.image || '/default-avatar.png'} alt={`${item.user?.personal?.name}'s avatar`} />
											<AvatarFallback>{item.user?.personal?.name[0]}</AvatarFallback>
										</Avatar>
										<div className="flex-1 space-y-2">
											<div className="flex items-center justify-between">
												<h4 className="text-sm font-semibold">{item.user?.personal?.name}</h4>
												<time className="text-xs text-muted-foreground">
													{new Date(item.createdAt).toLocaleString()}
												</time>
											</div>
											<p className="text-sm leading-relaxed">{item.description}</p>
										</div>
									</div>
								</Card>
							</motion.div>
						))}
					</AnimatePresence>
				)}
			</div>
		</section>
	)
}


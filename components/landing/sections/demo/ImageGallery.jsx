"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

// Sample data - replace with your own images
const sampleImages = [
	{
		id: "1",
		src: "/images/demo/admin/admin-dashboard.png",
		alt: "Admin Dashboard",
		title: "Admin Dashboard",
		description: "View Page",
	},
	{
		id: "2",
		src: "/images/demo/admin/recruiter-dashboard.png",
		alt: "Recruiter Dashboard",
		title: "Recruiter Dashboard",
		description: "View Page",
	},
	{
		id: "3",
		src: "/images/demo/admin/candidate-dashboard.png",
		alt: "Candidate Dashboard",
		title: "Candidate Dashboard",
		description: "View Page",
	},
	{
		id: "4",
		src: "/images/demo/admin/create-job.png",
		alt: "Create Job",
		title: "Create Job",
		description: "View Page",
	},
	{
		id: "5",
		src: "/images/demo/recruiter/job-details.png",
		alt: "Job Details",
		title: "Job Details",
		description: "View Page",
	},
	{
		id: "6",
		src: "/images/demo/admin/candidate-details.png",
		alt: "Candidate Details",
		title: "Candidate Details",
		description: "View Page",
	},
	{
		id: "7",
		src: "/images/demo/admin/candidate-table.png",
		alt: "Candidate Table",
		title: "Candidate Table",
		description: "View Page",
	},
	{
		id: "8",
		src: "/images/demo/admin/create-post.png",
		alt: "Create Post",
		title: "Create Post",
		description: "View Page",
	},
	{
		id: "9",
		src: "/images/demo/admin/create-recruiter.png",
		alt: "Create Recruiter",
		title: "Create Recruiter",
		description: "View Page",
	},
	{
		id: "10",
		src: "/images/demo/admin/edit-recruiter.png",
		alt: "Edit Recruiter",
		title: "Edit Recruiter",
		description: "View Page",
	},
	{
		id: "11",
		src: "/images/demo/recruiter/jobs-table.png",
		alt: "Jobs Table",
		title: "Jobs Table",
		description: "View Page",
	},
	{
		id: "12",
		src: "/images/demo/admin/post-details.png",
		alt: "Post Details",
		title: "Post Details",
		description: "View Page",
	},
	{
		id: "13",
		src: "/images/demo/admin/post-table.png",
		alt: "Post Table",
		title: "Post Table",
		description: "View Page",
	},
	{
		id: "14",
		src: "/images/demo/admin/profile.png",
		alt: "Profile",
		title: "Profile",
		description: "View Page",
	},
	{
		id: "15",
		src: "/images/demo/admin/recruiter-details.png",
		alt: "Recruiter Details",
		title: "Recruiter Details",
		description: "View Page",
	},
	{
		id: "16",
		src: "/images/demo/admin/recruiter-table.png",
		alt: "Recruiter Table",
		title: "Recruiter Table",
		description: "View Page",
	},
	{
		id: "17",
		src: "/images/demo/admin/subscription.png",
		alt: "Subscription",
		title: "Subscription",
		description: "View Page",
	},
]


const ImageCard = ({ image, index, openImage }) => {
	const [isHovered, setIsHovered] = useState(false)

	return (
		<motion.div
			key={image.id}
			className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer"
			whileHover={{ scale: 1.05 }}
			transition={{ type: "spring", stiffness: 300 }}
			onClick={() => openImage(index)}
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			onHoverStart={() => setIsHovered(true)}
			onHoverEnd={() => setIsHovered(false)}
		>
			<div className="relative aspect-[4/3] overflow-hidden">
				<Image
					src={image.src || "/placeholder.svg"}
					alt={image.alt}
					fill
					className="object-cover transition-transform duration-300 group-hover:scale-110"
				/>
			</div>
			<div className="relative inset-0 bg-gradient-to-t from-black/0 via-black/0 to-transparent flex flex-col justify-end p-4">
				<motion.h3
					className="text-xl font-semibold mb-1"
					animate={{ y: isHovered ? -5 : 0 }}
					transition={{ duration: 0.3 }}
				>
					{image.title}
				</motion.h3>
				<motion.p
					className="text-white/90 flex items-center gap-2 text-sm"
					animate={{ opacity: isHovered ? 1 : 0.7, y: isHovered ? -5 : 0 }}
					transition={{ duration: 0.3 }}
				>
					{image.description} <ArrowRight className="w-4 h-4" />
				</motion.p>
			</div>
			{isHovered && (
				<motion.div
					className="absolute inset-0 bg-primary/20"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
				/>
			)}
		</motion.div>
	)
}

export default function ImageGallery() {
	const [selectedImageIndex, setSelectedImageIndex] = useState(null)

	const openImage = (index) => {
		setSelectedImageIndex(index)
	}

	const closeImage = () => {
		setSelectedImageIndex(null)
	}

	const goToNextImage = () => {
		if (selectedImageIndex === null) return
		setSelectedImageIndex((selectedImageIndex + 1) % sampleImages.length)
	}

	const goToPreviousImage = () => {
		if (selectedImageIndex === null) return
		setSelectedImageIndex((selectedImageIndex - 1 + sampleImages.length) % sampleImages.length)
	}

	// Handle keyboard navigation
	const handleKeyDown = (e) => {
		if (selectedImageIndex === null) return

		if (e.key === "Escape") closeImage()
		if (e.key === "ArrowRight") goToNextImage()
		if (e.key === "ArrowLeft") goToPreviousImage()
	}

	return (
		<div onKeyDown={handleKeyDown} tabIndex={0} className="py-6">
			{/* Gallery Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{sampleImages.map((image, index) => (
					<ImageCard key={image.id} image={image} index={index} openImage={openImage} />
				))}
			</div>

			{/* Image Popup */}
			{selectedImageIndex !== null && (
				<div
					className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 sm:p-8"
					onClick={closeImage}
				>
					{/* Close button */}
					<Button
						variant="ghost"
						size="icon"
						className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
						onClick={(e) => {
							e.stopPropagation()
							closeImage()
						}}
					>
						<X className="h-6 w-6" />
						<span className="sr-only">Close</span>
					</Button>

					{/* Image container */}
					<div
						className="relative w-full max-w-5xl max-h-[80vh] flex items-center justify-center"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="relative w-full h-full max-h-[80vh] flex items-center justify-center">
							<Image
								src={sampleImages[selectedImageIndex].src || "/placeholder.svg"}
								alt={sampleImages[selectedImageIndex].alt}
								className="object-contain max-h-[80vh] rounded-lg"
								width={1200}
								height={800}
								priority
							/>
						</div>

						{/* Navigation buttons */}
						<Button
							variant="ghost"
							size="icon"
							className="absolute left-2 sm:left-4 text-white hover:bg-white/20 h-10 w-10 rounded-full"
							onClick={(e) => {
								e.stopPropagation()
								goToPreviousImage()
							}}
						>
							<ChevronLeft className="h-6 w-6" />
							<span className="sr-only">Previous image</span>
						</Button>

						<Button
							variant="ghost"
							size="icon"
							className="absolute right-2 sm:right-4 text-white hover:bg-white/20 h-10 w-10 rounded-full"
							onClick={(e) => {
								e.stopPropagation()
								goToNextImage()
							}}
						>
							<ChevronRight className="h-6 w-6" />
							<span className="sr-only">Next image</span>
						</Button>

						{/* Image caption */}
						<div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 rounded-b-lg">
							<h2 className="text-xl font-semibold">{sampleImages[selectedImageIndex].title}</h2>
							{sampleImages[selectedImageIndex].description && (
								<p className="mt-1 text-sm text-gray-300">{sampleImages[selectedImageIndex].description}</p>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}


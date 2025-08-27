'use client'

import "@/node_modules/react-modal-video/css/modal-video.css"
import { Play } from 'lucide-react'
import { useState } from 'react'
import ModalVideo from 'react-modal-video'

export default function VideoPopup({ videoId, style = 1 }) {
	const [isOpen, setOpen] = useState(false)

	return (
		<>
			{style === 1 && (
				<div className="flex items-center justify-center">
					<div
						className="flex items-center justify-center rounded-full cursor-pointer h-10 w-10 bg-primary-500"
						onClick={() => setOpen(true)}
					>
						<Play className="h-6 w-6 text-white" />
					</div>
					<span className='text-sm ml-2'>Play Now</span>
				</div>
			)}

			{style === 2 && (
				<div
					className="flex items-center justify-center rounded-full cursor-pointer h-10 w-10 bg-primary-500 mr-3"
					onClick={() => setOpen(true)}
				>
					<Play className="h-6 w-6 text-white fill-white" />
				</div>
			)}

			{style === 3 && (
				<div
					className="flex items-center justify-center rounded-full cursor-pointer h-10 w-10 bg-white mr-3"
					onClick={() => setOpen(true)}
				>
					<Play className="h-6 w-6 text-primary-500 fill-primary-500" />
				</div>
			)}

			{style === 4 && (
				<div
					className="flex items-center justify-center rounded-full cursor-pointer h-10 w-10 bg-primary-500 mr-3"
					onClick={() => setOpen(true)}
				>
					<Play className="h-6 w-6 text-white fill-white" />
				</div>
			)}

			{style === 5 && (
				<div
					className="flex items-center justify-center rounded-full cursor-pointer h-20 w-20 bg-primary-500 mr-3"
					onClick={() => setOpen(true)}
				>
					<Play className="h-12 w-12 text-white fill-white" />
				</div>
			)}

			<ModalVideo
				channel='youtube'
				autoplay
				isOpen={isOpen}
				videoId={videoId}
				onClose={() => setOpen(false)}
				allowFullScreen={true}
			/>
		</>
	)
}

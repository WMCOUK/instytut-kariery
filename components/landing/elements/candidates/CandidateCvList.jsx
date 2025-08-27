"use client"

import { Download, FileText } from "lucide-react"
import { useState } from "react"

export const CandidateCvList = ({ cvs }) => {
	const [hoveredId, setHoveredId] = useState(null)

	const formatFileSize = (bytes) => {
		if (bytes < 1024) return bytes + " bytes"
		if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
		return (bytes / 1048576).toFixed(1) + " MB"
	}

	const getFileIcon = (fileType) => {
		if (!fileType) return <FileText className="h-6 w-6 text-blue-500 mr-3" />
		if (fileType.includes("pdf")) return <FileText className="h-6 w-6 text-red-500 mr-3" />
		if (fileType.includes("word") || fileType.includes("docx")) return <FileText className="h-6 w-6 text-blue-500 mr-3" />
		return <FileText className="h-6 w-6 text-gray-500 mr-3" />
	}

	const handleDownload = (url, fileName) => {
		if (!url) return
		const link = document.createElement("a")
		link.href = url
		link.download = fileName || "file"
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	return (
		<>
			<ul className="divide-y divide-gray-200 dark:divide-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
				{cvs.map((cv) => (
					<li
						key={cv?.id}
						className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 ease-in-out"
						onMouseEnter={() => setHoveredId(cv?.id)}
						onMouseLeave={() => setHoveredId(null)}
					>
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								{getFileIcon(cv?.fileType)}
								<div>
									<p className="text-sm font-medium text-gray-900 dark:text-white">{cv?.title}</p>
									<p className="text-xs text-gray-500 dark:text-gray-400">
										{formatFileSize(cv?.fileSize)} • {new Date(cv?.createdAt).toLocaleDateString()}
									</p>
								</div>
							</div>
							<div
								className={`flex space-x-2 ${hoveredId === cv?.id ? "opacity-100" : "opacity-0 sm:opacity-50 hover:opacity-100"} transition-opacity duration-200`}
							>
								<button
									className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
									title="Download"
									onClick={() => handleDownload(cv?.fileUrl, cv?.title)}
								>
									<Download className="h-5 w-5 text-gray-600 dark:text-gray-400" />
								</button>
								{/* <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600" title="Delete">
									<Trash2 className="h-5 w-5 text-red-500" />
								</button> */}
							</div>
						</div>
					</li>
				))}
			</ul>
		</>
	)
}

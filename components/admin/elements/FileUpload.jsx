"use client"

import { Button } from "@/components/ui/button"
import { FileIcon, UploadIcon } from "lucide-react"
import { CldUploadWidget } from "next-cloudinary"
import { useCallback } from "react"

const FileUpload = ({ onChange, value, onValidate }) => {
	const handleFileUpload = useCallback(
		(result) => {
			onChange({
				fileUrl: result.info.secure_url,
				fileSize: result.info.bytes,
			})
		},
		[onChange],
	)

	const handleUploadClick = (open) => {
		if (onValidate()) {
			open()
		}
	}

	return (
		<CldUploadWidget
			onSuccess={handleFileUpload}
			uploadPreset="instytut-kariery"
			options={{
				maxFiles: 1,
				resourceType: "raw",
				allowedFormats: ["pdf"],
				deliveryType: "fetch",
			}}
		>
			{({ open }) => (
				<div className="flex flex-col items-center">
					<Button onClick={() => open?.()} type="button" variant="outline" className="w-full mb-2">
						{value ? "Replace PDF" : "Upload PDF"}
						<UploadIcon className="w-4 h-4 ml-2" />
					</Button>
					{value && (
						<div className="flex items-center justify-center w-full p-4 bg-muted rounded-md">
							<FileIcon className="w-8 h-8 mr-2 text-primary" />
							<a
								href={value}
								target="_blank"
								rel="noopener noreferrer"
								className="text-sm text-primary hover:underline"
							>
								View Uploaded PDF
							</a>
						</div>
					)}
				</div>
			)}
		</CldUploadWidget>
	)
}

export default FileUpload


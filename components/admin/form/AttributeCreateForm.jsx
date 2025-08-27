'use client'
import ImageUpload from "@/components/admin/elements/ImageUpload"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { slugify } from "@/utils"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
export default function AttributeCreateForm({ attPath, attribute }) {

	const router = useRouter()
	const [isAttName, setIsAttName] = useState({})

	const handleAttributeSubmit = async (e) => {
		e.preventDefault()
		if (!isAttName || !isAttName.title || !isAttName.title.trim()) {
			toast.error(`${attribute} Title Empty`)
			return
		}
		if (!isAttName || !isAttName.image || !isAttName.image.trim()) {
			toast.error(`${attribute} Image Empty`)
			return
		}
		try {
			const response = await fetch(`/api/v1/job/${attPath}`, {
				method: "POST",
				body: JSON.stringify({
					title: isAttName.title,
					icon: isAttName.icon,
					image: isAttName.image,
					slug: slugify(isAttName.title)
				}),
			})
			if (!response.ok) {
				throw new Error(`Error: ${response.status}`)
			}
			console.log(await response.json())
		} catch (error) {
			console.log(error)
			toast.error(error.message)
		} finally {
			setIsAttName({})
			toast.success(`${attribute} added successfully!`)
			router.push(`/recruiter/job/attributes/${attPath}`)
		}
	}

	const handleChange = (e) => {
		const name = e.target.name
		const value = e.target.value
		setIsAttName(prevState => ({ ...prevState, [name]: value }))
	}

	const handleImage = (newValue) => {
		setIsAttName((prevState) => ({ ...prevState, image: newValue }))
	}
	return (
		<>
			<form onSubmit={handleAttributeSubmit}>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="title"> Title</Label>
						<Input
							id="title"
							name="title"
							placeholder="Title"
							value={isAttName.title || ""}
							onChange={handleChange}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="title">Icon</Label>
						<Input
							id="icon"
							name="icon"
							placeholder="icon"
							value={isAttName.icon || ""}
							onChange={handleChange}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="img">Image</Label>
						<ImageUpload value={isAttName.image} onChange={handleImage} imgHeight={"150px"} />
					</div>
				</CardContent>
				<CardFooter>
					<Button type="submit" className="w-full">
						Publish
					</Button>
				</CardFooter>
			</form>
		</>
	)
}

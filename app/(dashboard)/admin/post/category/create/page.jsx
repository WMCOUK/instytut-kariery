'use client'
import ImageUpload from "@/components/admin/elements/ImageUpload"
import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { slugify } from "@/utils"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export default function Page() {
	const router = useRouter()
	const [category, setCategory] = useState({})

	const handleCategorySubmit = async (e) => {
		e.preventDefault()
		if (!category?.title?.trim()) {
			toast.error("Category Title Empty")
			return
		}
		if (!category?.img?.trim()) {
			toast.error("Category Image Empty")
			return
		}
		try {
			const response = await fetch("/api/v1/post/category", {
				method: "POST",
				body: JSON.stringify({
					title: category.title,
					img: category.img,
					slug: slugify(category.title),
				}),
			})
			if (!response.ok) {
				throw new Error(`Error: ${response.status}`)
			}
			await response.json()
			toast.success('Category added successfully!')
			setCategory({})
			router.push('/admin/post/category')
		} catch (error) {
			toast.error(error.message)
		}
	}

	const handleChange = (e) => {
		const name = e.target.name
		const value = e.target.value
		setCategory(prevState => ({ ...prevState, [name]: value }))
	}

	const handleImage = (newValue) => {
		setCategory((prevState) => ({ ...prevState, img: newValue }))
	}

	return (
		<LayoutAdmin>
			<Card className="w-full mx-auto">
				<CardHeader>
					<CardTitle className="text-xl">Create Category</CardTitle>
				</CardHeader>
				<form onSubmit={handleCategorySubmit}>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="title">Category Title</Label>
							<Input
								id="title"
								name="title"
								placeholder="Title"
								value={category.title || ""}
								onChange={handleChange}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="img">Category Image</Label>
							<ImageUpload value={category.img} onChange={handleImage} imgHeight={"150px"} />
						</div>
					</CardContent>
					<CardFooter>
						<Button type="submit" className="w-full">
							Publish
						</Button>
					</CardFooter>
				</form>
			</Card>
		</LayoutAdmin>
	)
}

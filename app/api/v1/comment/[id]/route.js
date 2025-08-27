// import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
	try {

		const { id } = await params

		const comment = await prisma.comment.findUnique({
			where: { id }
		})

		if (!comment) {
			return NextResponse.json(
				{ message: "comment not found" },
				{ status: 404 }
			)
		}
		return NextResponse.json(comment)

	} catch (error) {
		return NextResponse.json({ message: "Get Error", error }, { status: 500 })
	}
}



export const PATCH = async (requsest, { params }) => {
	// const session = await getAuthSession()
	// console.log(session)
	// if (!session) {
	//     return new NextResponse(JSON.stringify({ message: "Not Authenticated" }, { status: 401 }))
	// }
	try {
		const body = await requsest.json()
		const { id } = await params

		const updateComment = await prisma.comment.update({
			where: {
				id
			},
			data: {
				...body,
				// userEmail: session?.user?.email,
				// userId: session?.user?.id,
				// userName: session?.user?.name,
				// userImage: session?.user?.image
			}
		})

		if (!updateComment) {
			return NextResponse.json(
				{ message: "comment not found" },
				{ status: 404 }
			)
		}

		return NextResponse.json(updateComment)

	} catch (error) {
		return NextResponse.json({ message: "Update Error", error }, { status: 500 })
	}
}


export const DELETE = async (request, { params }) => {
	try {

		const { id } = await params

		await prisma.comment.delete({
			where: { id }
		})

		return NextResponse.json("comment has been deleted")

	} catch (error) {
		return NextResponse.json({ message: "Delete Error", error }, { status: 500 })
	}
}
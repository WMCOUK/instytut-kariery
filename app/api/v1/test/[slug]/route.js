import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
	try {

		const { slug } = await params

		const test = await prisma.test.update({
			where: { slug },
			data: { views: { increment: 1 } },
		})

		if (!test) {
			return NextResponse.json(
				{ message: "test not found" },
				{ status: 404 }
			)
		}
		return NextResponse.json(test)

	} catch (error) {
		return NextResponse.json({ message: "Get Error", error }, { status: 500 })
	}
}
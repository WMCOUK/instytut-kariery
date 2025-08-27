import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (requsest) => {
	try {

		const test = await prisma.test.findMany()
		return new NextResponse(JSON.stringify({ test }, { status: 200 }))

	} catch (error) {
		return NextResponse.json({ message: "Get Error", error }, { status: 500 })
	}
}


export const POST = async (requsest) => {
	// const session = await getAuthSession()
	try {
		const body = await requsest.json()

		const newTest = await prisma.test.create({
			data: {
				...body,
				// userId: session.user.id

			}
		})

		return NextResponse.json(newTest)

	} catch (error) {
		return NextResponse.json({ message: "test Error", error }, { status: 500 })
	}
}
import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

const ATTRIBUTE_PER_PAGE = 10

export const GET = async (request) => {
	const { searchParams } = new URL(request.url)
	const page = Number.parseInt(searchParams.get("page") || "1")
	const take = ATTRIBUTE_PER_PAGE
	const skip = ATTRIBUTE_PER_PAGE * (page - 1)

	try {
		const personals = await prisma.personal.findMany({
			skip,
			take,
			include: { user: true }
		})
		const totalPersonal = await prisma.personal.count()

		return NextResponse.json({
			personals,
			totalPersonal,
			totalPage: Math.ceil(totalPersonal / take)
		})
	} catch (error) {
		return NextResponse.json({ message: "Error fetching data", error: error.message }, { status: 500 })
	}
}

export async function PATCH(request) {
	const session = await getAuthSession()
	if (!session?.user) {
		return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
	}

	const { name, image, coverPhoto, designation, description, bio, address, phone, state, city, country, postalCode, website, latitude, longitude, seoMeta, gender, dateOfBirth } = await request.json()
	const userId = session.user.id

	try {
		const updatedPersonal = await prisma.personal.upsert({
			where: { userId },
			update: { name, image, coverPhoto, designation, description, bio, address, phone, state, city, country, postalCode, website, latitude, longitude, seoMeta, gender, dateOfBirth },
			create: { userId, name, image, coverPhoto, designation, description, bio, address, phone, state, city, country, postalCode, website, latitude, longitude, seoMeta, gender, dateOfBirth }
		})

		return NextResponse.json({ success: true, data: updatedPersonal })
	} catch (error) {
		return NextResponse.json({ message: "Error updating personal info", error: error.message }, { status: 500 })
	}
}

import { ATTRIBUTE_PER_PAGE } from "@/utils"
import currentUserServer from "@/utils/currentUserServer"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request) => {
	const { searchParams } = new URL(request.url)
	const page = Number.parseInt(searchParams.get("page") || "1")
	const take = ATTRIBUTE_PER_PAGE
	const skip = ATTRIBUTE_PER_PAGE * (page - 1)
	const currentUser = await currentUserServer();
	try {

		const experiences = await prisma.candidateExperience.findMany({
			skip,
			take,
			where: {
				userId: currentUser?.id, // Ensure we only fetch experiences for the current user
			},
		})
		const totalExperience = await prisma.candidateExperience.count()

		return new NextResponse(JSON.stringify({
			experiences,
			totalPage: Math.ceil(totalExperience / take)
		}))

	} catch (error) {
		return NextResponse.json({ message: "Get Error", error }, { status: 500 })
	}
}


export const POST = async (request) => {
	try {
		const currentUser = await currentUserServer();
		if (!currentUser) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const body = await request.json();
		// console.log("Received Body:", body);

		// Ensure `joinDate` and `leaveDate` are converted to Date format if present
		const newExperience = await prisma.candidateExperience.create({
			data: {
				title: body.title,
				slug: body.slug,
				description: body.description || null,
				companyName: body.companyName || null,
				joinDate: body.joinDate ? new Date(body.joinDate) : null,
				leaveDate: body.leaveDate ? new Date(body.leaveDate) : null,
				isCurrentJob: body.isCurrentJob || false,
				userId: currentUser.id,
			},
		});

		console.log("New Experience Created:", newExperience);
		return NextResponse.json(newExperience);
	} catch (error) {
		console.error("Server Error:", error);
		return NextResponse.json({ message: "Post Error", error: error.message }, { status: 500 });
	}
};
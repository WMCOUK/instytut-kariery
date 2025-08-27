import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

// PATCH: Update user preference settings
export async function PATCH(request) {
	const session = await getAuthSession()
	if (!session?.user) {
		return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
	}

	const { notifyOnShortlist, notifyOnExpire, notifyOnJobAlert, notifyOnSaved, notifyOnRejected, isProfilePublic, isResumePublic } = await request.json()

	// console.log("Received data:", { notifyOnShortlist, notifyOnExpire, notifyOnJobAlert, notifyOnSaved, notifyOnRejected, isProfilePublic, isResumePublic });
	
	const userId = session?.user?.id

	try {
		const updatedPreference = await prisma.preference.upsert({
			where: { userId },
			update: { notifyOnShortlist, notifyOnExpire, notifyOnJobAlert, notifyOnSaved, notifyOnRejected, isProfilePublic, isResumePublic },
			create: { userId, notifyOnShortlist, notifyOnExpire, notifyOnJobAlert, notifyOnSaved, notifyOnRejected, isProfilePublic, isResumePublic }
		})

		return NextResponse.json({ success: true, data: updatedPreference })
	} catch (error) {
		return NextResponse.json({ message: "Error updating preferences", error: error.message }, { status: 500 })
	}
}

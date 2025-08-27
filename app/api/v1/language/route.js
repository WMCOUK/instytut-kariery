import { cookies } from "next/headers"

export async function POST(request) {
	const { value } = await request.json()

	// Use the cookies() function directly
	cookies().set("language", value)

	return new Response("Language updated", { status: 200 })
}


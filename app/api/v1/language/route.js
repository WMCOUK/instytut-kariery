import { cookies } from "next/headers"

const SUPPORTED = ["pl", "en"]

export async function POST(request) {
	const { value } = await request.json()

	if (!SUPPORTED.includes(value)) {
		return new Response("Invalid language", { status: 400 })
	}

	const cookieStore = await cookies()
	cookieStore.set("language", value, {
		path: "/",
		maxAge: 60 * 60 * 24 * 365, // 1 year
		sameSite: "lax",
		httpOnly: false,
	})

	return new Response("Language updated", { status: 200 })
}

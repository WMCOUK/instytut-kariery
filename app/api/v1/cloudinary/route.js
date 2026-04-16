import { isAuthFailure, requireRole } from "@/utils/apiAuth"
import { NextResponse } from "next/server"

export async function GET(request) {
	const session = await requireRole(["ADMIN"])
	if (isAuthFailure(session)) return session

	try {
		const cloudName = process.env.CLOUDINARY_CLOUD_NAME
		const apiKey = process.env.CLOUDINARY_API_KEY
		const apiSecret = process.env.CLOUDINARY_API_SECRET

		const { searchParams } = new URL(request.url)
		const nextCursor = searchParams.get("next_cursor") || ""
		const maxResults = 32 // 20 per page

		const url = new URL(`https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload`)
		url.searchParams.append("prefix", "instytut-kariery/")
		url.searchParams.append("max_results", maxResults)
		url.searchParams.append("direction", "desc") // newest first
		url.searchParams.append("sort_by", "created_at") // 👈 force sort by latest uploaded

		if (nextCursor) url.searchParams.append("next_cursor", nextCursor)

		const res = await fetch(url, {
			headers: {
				Authorization:
					"Basic " + Buffer.from(apiKey + ":" + apiSecret).toString("base64"),
			},
			cache: "no-store",
		})

		if (!res.ok) throw new Error("Failed to fetch images from Cloudinary")

		const data = await res.json()

		// Ensure sorting fallback in case Cloudinary ignores order
		const sortedImages = (data.resources || []).sort(
			(a, b) => new Date(b.created_at) - new Date(a.created_at)
		)

		return NextResponse.json({
			images: sortedImages,
			nextCursor: data.next_cursor || null,
		})
	} catch (err) {
		console.error("Cloudinary API Error:", err)
		return NextResponse.json(
			{ error: "Failed to load images" },
			{ status: 500 }
		)
	}
}


// Cloudinary public IDs are returned by the Cloudinary upload API.
// We restrict deletes to assets whose ID starts with our project prefix
// so even an admin mistake can't accidentally delete assets in other
// folders (or in another tenant if Cloudinary keys ever get reused).
const PROJECT_PREFIX = "instytut-kariery/"
const MAX_DELETE_BATCH = 100

export async function DELETE(request) {
  const session = await requireRole(["ADMIN"])
  if (isAuthFailure(session)) return session

  try {
    const { publicIds } = await request.json()

    if (!Array.isArray(publicIds) || publicIds.length === 0) {
      return NextResponse.json({ error: "No public IDs provided" }, { status: 400 })
    }

    if (publicIds.length > MAX_DELETE_BATCH) {
      return NextResponse.json(
        { error: `Too many IDs (max ${MAX_DELETE_BATCH} per request)` },
        { status: 400 }
      )
    }

    // Validate every ID: must be a non-empty string, scoped to our project.
    const invalid = publicIds.find(
      (id) => typeof id !== "string" || id.length === 0 || !id.startsWith(PROJECT_PREFIX)
    )
    if (invalid !== undefined) {
      return NextResponse.json(
        { error: "Invalid public ID — must be a string scoped to project prefix" },
        { status: 400 }
      )
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload`

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: "Basic " + Buffer.from(apiKey + ":" + apiSecret).toString("base64"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_ids: publicIds }),
    })

    if (!res.ok) throw new Error("Failed to delete images from Cloudinary")

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Cloudinary Delete Error:", err)
    return NextResponse.json({ error: "Failed to delete images" }, { status: 500 })
  }
}
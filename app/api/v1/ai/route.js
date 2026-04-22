import { isAuthFailure, requireAuth } from "@/utils/apiAuth"
import { rateLimit } from "@/utils/rateLimit"
import { NextResponse } from "next/server"
import OpenAI from "openai"

const MAX_PROMPT_LENGTH = 2000

export async function POST(req) {
	const limited = rateLimit(req, { id: "ai", max: 10, windowMs: 60_000 })
	if (limited) return limited

	const session = await requireAuth()
	if (isAuthFailure(session)) return session

	const { prompt } = await req.json()
	if (typeof prompt !== "string" || prompt.length === 0) {
		return NextResponse.json({ message: "Prompt is required" }, { status: 400 })
	}
	if (prompt.length > MAX_PROMPT_LENGTH) {
		return NextResponse.json({ message: "Prompt too long" }, { status: 400 })
	}

	try {
		const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
		const response = await openai.responses.create({
			model: "gpt-4o-mini",
			input: prompt,
		})
		return NextResponse.json({ text: response.output_text })
	} catch (error) {
		return NextResponse.json({ message: "AI request failed" }, { status: 500 })
	}
}

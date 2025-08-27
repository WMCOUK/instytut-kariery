import OpenAI from "openai"

export async function POST(req) {
	const openai = new OpenAI({
		apiKey: process.env.OPENAI_API_KEY, // keep it secret in env
	})

	const { prompt } = await req.json()

	const response = await openai.responses.create({
		model: "gpt-4o-mini",
		input: prompt,
	})

	return Response.json({ text: response.output_text })
}

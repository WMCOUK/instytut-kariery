import prisma from '@/utils/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request) {
	try {
		const { latitude, longitude, radius } = await request.json()

		// Validate inputs
		if (
			typeof latitude !== 'number' ||
			typeof longitude !== 'number' ||
			typeof radius !== 'number' ||
			latitude < -90 ||
			latitude > 90 ||
			longitude < -180 ||
			longitude > 180 ||
			radius <= 0
		) {
			return NextResponse.json({ error: 'Invalid latitude, longitude, or radius' }, { status: 400 })
		}

		const locations = await prisma.$queryRaw`
      SELECT id, title AS name, CAST(latitude AS FLOAT) AS latitude, CAST(longitude AS FLOAT) AS longitude
      FROM "Job"
      WHERE latitude IS NOT NULL
      AND longitude IS NOT NULL
      AND earth_box(ll_to_earth(${latitude}, ${longitude}), ${radius * 1000}) @> ll_to_earth(latitude, longitude)
      AND earth_distance(ll_to_earth(${latitude}, ${longitude}), ll_to_earth(latitude, longitude)) < ${radius * 1000}
    `

		return NextResponse.json(locations || [])
	} catch (error) {
		console.error('API error:', error)
		return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 })
	} finally {
		await prisma.$disconnect()
	}
}
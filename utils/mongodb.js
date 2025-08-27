'use server'

import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prismadb"
import { mkdir, readFile, writeFile } from 'fs/promises'
import { MongoClient, ObjectId } from 'mongodb'
import { scheduleJob } from 'node-schedule'
import path from 'path'

// Helper functions (unchanged)
function serializeDocument(doc) {
	const serialized = {}
	for (const [key, value] of Object.entries(doc)) {
		if (value instanceof ObjectId) {
			serialized[key] = { $oid: value.toString() }
		} else if (value instanceof Date) {
			serialized[key] = { $date: value.toISOString() }
		} else if (Array.isArray(value)) {
			serialized[key] = value.map(item =>
				typeof item === 'object' ? serializeDocument(item) : item
			)
		} else if (typeof value === 'object' && value !== null) {
			serialized[key] = serializeDocument(value)
		} else {
			serialized[key] = value
		}
	}
	return serialized
}

function deserializeDocument(doc) {
	const deserialized = {}
	for (const [key, value] of Object.entries(doc)) {
		if (value && typeof value === 'object') {
			if ('$oid' in value) {
				deserialized[key] = new ObjectId(value.$oid)
			} else if ('$date' in value) {
				deserialized[key] = new Date(value.$date)
			} else if (Array.isArray(value)) {
				deserialized[key] = value.map(item =>
					typeof item === 'object' ? deserializeDocument(item) : item
				)
			} else {
				deserialized[key] = deserializeDocument(value)
			}
		} else {
			deserialized[key] = value
		}
	}
	return deserialized
}

function normalizeSkills(skills) {
	if (Array.isArray(skills)) {
		return skills
	}
	if (typeof skills === 'string') {
		try {
			const parsed = JSON.parse(skills)
			if (Array.isArray(parsed)) {
				return parsed
			}
			if (typeof parsed === 'object') {
				return Object.values(parsed)
			}
		} catch (e) {
			// If parsing fails, split the string
			return skills.split(',').map(s => s.trim())
		}
	}
	if (typeof skills === 'object') {
		return Object.values(skills)
	}
	return []
}

async function connectToMongoDB() {
	if (!process.env.DATABASE_URL) {
		throw new Error('DATABASE_URL is not defined in environment variables')
	}

	const client = new MongoClient(process.env.DATABASE_URL)
	await client.connect()
	return client
}

async function isAdmin() {
	const session = await getAuthSession()
	if (!session?.user?.email) return false

	const currentUser = await prisma.user.findUnique({
		where: { email: session.user.email }
	})

	return currentUser?.isRole === "ADMIN"
}

function getDailyFolderName(date) {
	return date.toISOString().split('T')[0] // Format: YYYY-MM-DD
}

function getMonthlyFolderName(date) {
	return `${date.toLocaleString('default', { month: 'long' }).toLowerCase()}-${date.getFullYear()}`
}

function getYearlyFolderName(date) {
	return `${date.getFullYear()}-Year`
}

function getAllDataFolderName() {
	return 'all-data'
}

// Modified function to handle file management for different backup types
async function manageBackupFiles(folderPath, collectionName, backupType, date) {
	let fileName
	switch (backupType) {
		case 'daily':
			fileName = `${collectionName}_${date.toISOString().split('T')[0]}.json`
			break
		case 'monthly':
			fileName = `${collectionName}_${date.toLocaleString('default', { month: 'long' }).toLowerCase()}.json`
			break
		case 'yearly':
			fileName = `${collectionName}_${date.getFullYear()}.json`
			break
		case 'all-data':
			fileName = `${collectionName}.json`
			break
	}
	return path.join(folderPath, fileName)
}

// Modified exportAndSaveData function
async function exportAndSaveData(collectionName, query, backupType) {
	const client = await connectToMongoDB()
	try {
		const db = client.db(process.env.EXPORT_DB || 'jobjet')
		const collection = db.collection(collectionName)

		const data = await collection.find(query).toArray()
		if (data.length === 0 && backupType !== 'all-data') {
			console.log(`No data found for ${collectionName} in ${backupType} backup. Skipping file creation.`)
			return {
				success: true,
				message: `No data to export for ${collectionName} in ${backupType} backup.`,
				data: []
			}
		}

		const serializedData = data.map(doc => {
			const serialized = serializeDocument(doc)
			if (serialized.skills) {
				serialized.skills = normalizeSkills(serialized.skills)
			}
			return serialized
		})

		const now = new Date()
		let folderName
		switch (backupType) {
			case 'daily':
				folderName = getDailyFolderName(now)
				break
			case 'monthly':
				folderName = getMonthlyFolderName(now)
				break
			case 'yearly':
				folderName = getYearlyFolderName(now)
				break
			case 'all-data':
				folderName = getAllDataFolderName()
				break
		}

		const backupPath = path.join(process.cwd(), 'backup', 'export', folderName)
		await mkdir(backupPath, { recursive: true })

		const filePath = await manageBackupFiles(backupPath, collectionName, backupType, now)

		if (backupType === 'all-data') {
			// For all-data, we always write the full data
			await writeFile(filePath, JSON.stringify(serializedData, null, 2))
		} else {
			// For other types, we update the existing file or create a new one
			let existingData = []
			try {
				const existingContent = await readFile(filePath, 'utf8')
				existingData = JSON.parse(existingContent)
			} catch (error) {
				// File doesn't exist or is empty, which is fine
			}

			// Merge existing data with new data, using _id as the key
			const mergedData = [...existingData, ...serializedData]
			const uniqueData = Object.values(mergedData.reduce((acc, item) => {
				acc[item._id.$oid] = item
				return acc
			}, {}))

			await writeFile(filePath, JSON.stringify(uniqueData, null, 2))
		}

		return {
			success: true,
			message: `${backupType} backup for ${collectionName} exported successfully. ${serializedData.length} documents exported.`,
			path: filePath,
			data: serializedData
		}
	} catch (error) {
		console.error(`Export failed for ${backupType} backup:`, error)
		return { success: false, message: `Export failed for ${backupType} backup: ${error instanceof Error ? error.message : 'Unknown error'}` }
	} finally {
		await client.close()
	}
}

// The rest of the functions remain unchanged
export async function getAllCollections(dbName) {
	if (!await isAdmin()) {
		return { success: false, message: 'Access denied. Admin privileges required.' }
	}

	let client
	try {
		client = await connectToMongoDB()
		const db = client.db(dbName)
		const collections = await db.listCollections().toArray()
		return {
			success: true,
			collections: collections.map(col => col.name)
		}
	} catch (error) {
		console.error('Failed to get collections:', error)
		return { success: false, message: `Failed to get collections: ${error instanceof Error ? error.message : 'Unknown error'}` }
	} finally {
		if (client) await client.close()
	}
}

export async function importCollection(formData) {
	if (!await isAdmin()) {
		return { success: false, message: 'Access denied. Admin privileges required.' }
	}

	const collectionName = formData.get('collectionName')
	const file = formData.get('file')

	if (!collectionName || !file) {
		return { success: false, message: 'Missing collection name or file' }
	}

	let client
	try {
		client = await connectToMongoDB()
		const db = client.db(process.env.EXPORT_DB || 'jobjet')
		const collection = db.collection(collectionName)

		console.log(`Importing collection ${collectionName}...`)

		const monthlyFolder = getMonthlyFolderName(new Date())
		const importPath = path.join(process.cwd(), 'backup', 'import', monthlyFolder)
		await mkdir(importPath, { recursive: true })

		const filePath = path.join(importPath, file.name)
		await writeFile(filePath, Buffer.from(await file.arrayBuffer()))

		const fileContent = await readFile(filePath, 'utf8')
		const serializedData = JSON.parse(fileContent)
		const data = serializedData.map((doc) => {
			const deserialized = deserializeDocument(doc)
			if (deserialized.skills) {
				deserialized.skills = normalizeSkills(deserialized.skills)
			}
			return deserialized
		})

		if (!Array.isArray(data)) {
			throw new Error('Invalid import file format. Expected an array of documents.')
		}

		if (data.length > 0) {
			const bulkOps = data.map(doc => ({
				updateOne: {
					filter: { _id: doc._id },
					update: { $set: doc },
					upsert: true
				}
			}))
			await collection.bulkWrite(bulkOps)
		}

		return {
			success: true,
			message: `Collection ${collectionName} imported successfully. ${data.length} documents imported/updated.`
		}
	} catch (error) {
		console.error('Import failed:', error)
		return { success: false, message: `Import failed: ${error instanceof Error ? error.message : 'Unknown error'}` }
	} finally {
		if (client) await client.close()
	}
}

export async function scheduleBackup(time = '23:59') {
	if (!await isAdmin()) {
		return { success: false, message: 'Access denied. Admin privileges required.' }
	}

	try {
		const [hours, minutes] = time.split(':').map(Number)
		const cronExpression = `${minutes} ${hours} * * *`

		scheduleJob(cronExpression, async () => {
			console.log(`Daily backup process started at ${time}`)
			const now = new Date()
			const startOfDay = new Date(now)
			startOfDay.setHours(0, 0, 0, 0)

			const collectionsResult = await getAllCollections(process.env.EXPORT_DB || 'jobjet')
			if (!collectionsResult.success) {
				console.error('Failed to get collections:', collectionsResult.message)
				return
			}

			for (const collectionName of collectionsResult.collections) {
				console.log(`Processing collection: ${collectionName}`)

				// All-data backup (all data, including new data)
				const allDataBackupResult = await exportAndSaveData(
					collectionName,
					{},
					'all-data'
				)
				logBackupResult(allDataBackupResult, collectionName, 'All-data')

				// Daily backup (new data in the last 24 hours)
				const dailyBackupResult = await exportAndSaveData(
					collectionName,
					{ createdAt: { $gte: startOfDay, $lte: now } },
					'daily'
				)
				logBackupResult(dailyBackupResult, collectionName, 'Daily')

				// Monthly backup (all data for the current month)
				const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
				const monthlyBackupResult = await exportAndSaveData(
					collectionName,
					{ createdAt: { $gte: startOfMonth, $lte: now } },
					'monthly'
				)
				logBackupResult(monthlyBackupResult, collectionName, 'Monthly')

				// Yearly backup (all data for the current year)
				const startOfYear = new Date(now.getFullYear(), 0, 1)
				const yearlyBackupResult = await exportAndSaveData(
					collectionName,
					{ createdAt: { $gte: startOfYear, $lte: now } },
					'yearly'
				)
				logBackupResult(yearlyBackupResult, collectionName, 'Yearly')
			}

			console.log('Daily backup process completed')
		})

		return { success: true, message: `Scheduled daily backup for all collections at ${time}` }
	} catch (error) {
		console.error('Scheduling backup failed:', error)
		return { success: false, message: `Scheduling backup failed: ${error instanceof Error ? error.message : 'Unknown error'}` }
	}
}

function logBackupResult(result, collectionName, backupType) {
	if (result.success) {
		if (result.data.length > 0) {
			console.log(`${backupType} backup for ${collectionName} exported successfully. ${result.data.length} documents exported.`)
		} else {
			console.log(`No new data for ${collectionName} in ${backupType} backup. Skipped file creation.`)
		}
	} else {
		console.error(`Failed to export ${backupType} backup for ${collectionName}: ${result.message}`)
	}
}

export async function exportCollection(collectionName, params = {}) {
	if (!await isAdmin()) {
		return { success: false, message: 'Access denied. Admin privileges required.' }
	}

	let client
	try {
		client = await connectToMongoDB()
		const db = client.db(process.env.EXPORT_DB || 'jobjet')
		const collection = db.collection(collectionName)

		console.log(`Exporting collection ${collectionName}...`)

		let query = {}
		if (params.dataDate) {
			const startOfDay = new Date(params.dataDate)
			startOfDay.setHours(0, 0, 0, 0)
			const endOfDay = new Date(params.dataDate)
			endOfDay.setHours(23, 59, 59, 999)
			query.createdAt = { $gte: startOfDay, $lte: endOfDay }
		} else if (params.filterStartDate || params.filterEndDate) {
			query.createdAt = {}
			if (params.filterStartDate) {
				query.createdAt.$gte = new Date(params.filterStartDate)
			}
			if (params.filterEndDate) {
				query.createdAt.$lte = new Date(params.filterEndDate)
			}
		}

		console.log('Export query:', JSON.stringify(query))

		const data = await collection.find(query).toArray()
		console.log(`Found ${data.length} documents`)

		if (data.length === 0) {
			return { success: false, message: 'No data found for the specified criteria.' }
		}

		const serializedData = data.map(doc => {
			const serialized = serializeDocument(doc)
			if (serialized.skills) {
				serialized.skills = normalizeSkills(serialized.skills)
			}
			return serialized
		})

		const now = new Date()
		const backupType = await params.dataDate ? 'daily' : 'all-data'
		const backupResult = await exportAndSaveData(collectionName, query, backupType)

		return backupResult
	} catch (error) {
		console.error('Export failed:', error)
		return { success: false, message: `Export failed: ${error instanceof Error ? error.message : 'Unknown error'}` }
	} finally {
		if (client) await client.close()
	}
}


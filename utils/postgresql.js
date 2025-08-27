'use server'

import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prismadb"
import { mkdir, readFile, writeFile } from 'fs/promises'
import { scheduleJob } from 'node-schedule'
import path from 'path'
import { Client } from 'pg'

async function connectToPostgres(dbName) {
	if (!process.env.DATABASE_URL) {
		throw new Error('DATABASE_URL is not defined in environment variables')
	}

	const client = new Client({
		connectionString: process.env.DATABASE_URL,
		database: dbName,
	})
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
	return date.toISOString().split('T')[0] // YYYY-MM-DD
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

async function manageBackupFiles(folderPath, tableName, backupType, date) {
	let fileName
	switch (backupType) {
		case 'daily':
			fileName = `${tableName}_${date.toISOString().split('T')[0]}.json`
			break
		case 'monthly':
			fileName = `${tableName}_${date.toLocaleString('default', { month: 'long' }).toLowerCase()}.json`
			break
		case 'yearly':
			fileName = `${tableName}_${date.getFullYear()}.json`
			break
		case 'all-data':
			fileName = `${tableName}.json`
			break
		default:
			fileName = `${tableName}.json`
	}
	return path.join(folderPath, fileName)
}

export async function getAllTables(dbName) {
	if (!await isAdmin()) {
		return { success: false, message: 'Access denied. Admin privileges required.' }
	}

	let client
	try {
		client = await connectToPostgres(dbName || process.env.POSTGRES_DB || 'postgres')

		const res = await client.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    `)
		const tables = res.rows.map(row => row.table_name)

		return { success: true, tables }
	} catch (error) {
		console.error('Failed to get tables:', error)
		return { success: false, message: `Failed to get tables: ${error instanceof Error ? error.message : 'Unknown error'}` }
	} finally {
		if (client) await client.end()
	}
}

async function validateTableName(tableName) {
	const result = await getAllTables(process.env.POSTGRES_DB || 'postgres')
	if (!result.success) throw new Error('Failed to fetch valid tables for validation')
	if (!result.tables.includes(tableName)) throw new Error(`Invalid table name: ${tableName}`)
}

async function exportAndSaveData(tableName, whereClause = '', params = [], backupType) {
	if (!await isAdmin()) {
		return { success: false, message: 'Access denied. Admin privileges required.' }
	}

	// Validate table name
	try {
		await validateTableName(tableName)
	} catch (err) {
		return { success: false, message: err.message }
	}

	const client = await connectToPostgres(process.env.POSTGRES_DB || 'postgres')

	try {
		const queryText = `SELECT * FROM "${tableName}" ${whereClause}`
		const res = await client.query(queryText, params)
		const data = res.rows

		if (data.length === 0 && backupType !== 'all-data') {
			return {
				success: true,
				message: `No data to export for ${tableName} in ${backupType} backup.`,
				data: []
			}
		}

		const serializedData = data

		const now = new Date()
		let folderName
		switch (backupType) {
			case 'daily': folderName = getDailyFolderName(now); break
			case 'monthly': folderName = getMonthlyFolderName(now); break
			case 'yearly': folderName = getYearlyFolderName(now); break
			case 'all-data': folderName = getAllDataFolderName(); break
			default: folderName = getAllDataFolderName()
		}

		const backupPath = path.join(process.cwd(), 'backup', 'export', folderName)
		await mkdir(backupPath, { recursive: true })

		const filePath = await manageBackupFiles(backupPath, tableName, backupType, now)

		if (backupType === 'all-data') {
			await writeFile(filePath, JSON.stringify(serializedData, null, 2))
		} else {
			let existingData = []
			try {
				const existingContent = await readFile(filePath, 'utf8')
				existingData = JSON.parse(existingContent)
			} catch { }

			const mergedMap = new Map()
			for (const item of existingData) mergedMap.set(item.id, item)
			for (const item of serializedData) mergedMap.set(item.id, item)
			const uniqueData = Array.from(mergedMap.values())

			await writeFile(filePath, JSON.stringify(uniqueData, null, 2))
		}

		return {
			success: true,
			message: `${backupType} backup for ${tableName} exported successfully. ${serializedData.length} rows exported.`,
			path: filePath,
			data: serializedData
		}
	} catch (error) {
		console.error(`Export failed for ${backupType} backup:`, error)
		return { success: false, message: `Export failed for ${backupType} backup: ${error instanceof Error ? error.message : 'Unknown error'}` }
	} finally {
		await client.end()
	}
}

export async function importTable(formData) {
	if (!await isAdmin()) {
		return { success: false, message: 'Access denied. Admin privileges required.' }
	}

	const tableName = formData.get('tableName')
	const file = formData.get('file')

	if (!tableName || !file) {
		return { success: false, message: 'Missing table name or file' }
	}

	// Validate table name
	try {
		await validateTableName(tableName)
	} catch (err) {
		return { success: false, message: err.message }
	}

	let client
	try {
		client = await connectToPostgres(process.env.POSTGRES_DB || 'postgres')

		const monthlyFolder = getMonthlyFolderName(new Date())
		const importPath = path.join(process.cwd(), 'backup', 'import', monthlyFolder)
		await mkdir(importPath, { recursive: true })

		const filePath = path.join(importPath, file.name)
		await writeFile(filePath, Buffer.from(await file.arrayBuffer()))

		const fileContent = await readFile(filePath, 'utf8')
		const data = JSON.parse(fileContent)

		if (!Array.isArray(data)) {
			throw new Error('Invalid import file format. Expected an array of rows.')
		}

		if (data.length === 0) {
			return { success: true, message: 'No data to import.' }
		}

		const columns = Object.keys(data[0])
		const columnNames = columns.map(col => `"${col}"`).join(', ')
		const updates = columns.map(col => `"${col}" = EXCLUDED."${col}"`).join(', ')

		const values = []
		const placeholders = data.map(row => {
			const rowPlaceholders = columns.map(col => {
				values.push(row[col])
				return `$${values.length}`
			})
			return `(${rowPlaceholders.join(', ')})`
		}).join(', ')

		const query = `
      INSERT INTO "${tableName}" (${columnNames})
      VALUES ${placeholders}
      ON CONFLICT (id) DO UPDATE SET
      ${updates}
    `

		await client.query('BEGIN')
		await client.query(query, values)
		await client.query('COMMIT')

		return {
			success: true,
			message: `Table ${tableName} imported successfully. ${data.length} rows inserted/updated.`
		}
	} catch (error) {
		if (client) await client.query('ROLLBACK')

		// Handle FK violation with clear message
		if (error.code === '23503') {
			return {
				success: false,
				message: `Foreign key violation: ${error.detail || 'Some referenced data is missing in the related table.'}`
			}
		}

		console.error('Import failed:', error)
		return { success: false, message: `Import failed: ${error instanceof Error ? error.message : 'Unknown error'}` }
	} finally {
		if (client) await client.end()
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

			const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
			const startOfYear = new Date(now.getFullYear(), 0, 1)

			const tablesResult = await getAllTables(process.env.POSTGRES_DB || 'postgres')
			if (!tablesResult.success) {
				console.error('Failed to get tables:', tablesResult.message)
				return
			}

			for (const tableName of tablesResult.tables) {
				console.log(`Processing table: ${tableName}`)

				// All-data backup (full table)
				const allDataBackupResult = await exportAndSaveData(tableName, '', [], 'all-data')
				logBackupResult(allDataBackupResult, tableName, 'All-data')

				// Daily backup (rows created/updated in last 24h)
				const dailyBackupResult = await exportAndSaveData(
					tableName,
					`WHERE created_at >= $1 AND created_at <= $2`,
					[startOfDay.toISOString(), now.toISOString()],
					'daily'
				)
				logBackupResult(dailyBackupResult, tableName, 'Daily')

				// Monthly backup
				const monthlyBackupResult = await exportAndSaveData(
					tableName,
					`WHERE created_at >= $1 AND created_at <= $2`,
					[startOfMonth.toISOString(), now.toISOString()],
					'monthly'
				)
				logBackupResult(monthlyBackupResult, tableName, 'Monthly')

				// Yearly backup
				const yearlyBackupResult = await exportAndSaveData(
					tableName,
					`WHERE created_at >= $1 AND created_at <= $2`,
					[startOfYear.toISOString(), now.toISOString()],
					'yearly'
				)
				logBackupResult(yearlyBackupResult, tableName, 'Yearly')
			}

			console.log('Daily backup process completed')
		})

		return { success: true, message: `Scheduled daily backup for all tables at ${time}` }
	} catch (error) {
		console.error('Scheduling backup failed:', error)
		return { success: false, message: `Scheduling backup failed: ${error instanceof Error ? error.message : 'Unknown error'}` }
	}
}

function logBackupResult(result, tableName, backupType) {
	if (result.success) {
		if (result.data && result.data.length > 0) {
			console.log(`${backupType} backup for ${tableName} exported successfully. ${result.data.length} rows exported.`)
		} else {
			console.log(`No new data for ${tableName} in ${backupType} backup. Skipped file creation.`)
		}
	} else {
		console.error(`Failed to export ${backupType} backup for ${tableName}: ${result.message}`)
	}
}

export async function exportTable(tableName, params = {}) {
	if (!await isAdmin()) {
		return { success: false, message: 'Access denied. Admin privileges required.' }
	}

	// Validate table name
	try {
		await validateTableName(tableName)
	} catch (err) {
		return { success: false, message: err.message }
	}

	const client = await connectToPostgres(process.env.POSTGRES_DB || 'postgres')

	try {
		let whereClause = ''
		const queryParams = []

		if (params.dataDate) {
			const startOfDay = new Date(params.dataDate)
			startOfDay.setHours(0, 0, 0, 0)
			const endOfDay = new Date(params.dataDate)
			endOfDay.setHours(23, 59, 59, 999)
			whereClause = `WHERE created_at >= $1 AND created_at <= $2`
			queryParams.push(startOfDay.toISOString(), endOfDay.toISOString())
		} else if (params.filterStartDate || params.filterEndDate) {
			const conditions = []
			if (params.filterStartDate) {
				conditions.push(`created_at >= $${queryParams.length + 1}`)
				queryParams.push(new Date(params.filterStartDate).toISOString())
			}
			if (params.filterEndDate) {
				conditions.push(`created_at <= $${queryParams.length + 1}`)
				queryParams.push(new Date(params.filterEndDate).toISOString())
			}
			if (conditions.length > 0) {
				whereClause = 'WHERE ' + conditions.join(' AND ')
			}
		}

		const res = await client.query(`SELECT * FROM "${tableName}" ${whereClause}`, queryParams)
		const data = res.rows

		if (data.length === 0) {
			return { success: false, message: 'No data found for the specified criteria.' }
		}

		const backupType = params.dataDate ? 'daily' : 'all-data'
		const backupResult = await exportAndSaveData(tableName, whereClause, queryParams, backupType)

		return backupResult
	} catch (error) {
		console.error('Export failed:', error)
		return { success: false, message: `Export failed: ${error instanceof Error ? error.message : 'Unknown error'}` }
	} finally {
		await client.end()
	}
}

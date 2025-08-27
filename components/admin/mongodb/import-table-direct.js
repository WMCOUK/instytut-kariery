"use server"
export async function importTableDirect(formData) {
	const { importTable } = await import("@/utils/postgresql")
	return await importTable(formData)
}
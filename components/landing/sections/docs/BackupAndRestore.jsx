'use client'

import DocsContent from "@/components/landing/layout/docs/content"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BackupAndRestore({ title, path }) {
	return (
		<DocsContent title={title} path={path}>
			<Card className="bg-card border-primary/10">
				<CardHeader>
					<CardTitle>Backup and Restore</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6 prose max-w-none">
					<p>
						PostgreSQL data can be backed up and restored using Prisma and custom scripts:
					</p>
					<ul className="list-disc list-inside space-y-1">
						<li>
							<strong>Backup</strong>: Export database schema and data using <code>pg_dump</code> or Prisma’s migration tools.
						</li>
						<li>
							<strong>Restore</strong>: Import data using <code>psql</code> or Prisma migrations.
						</li>
						<li>
							<strong>Scripts</strong>:
							<ul className="list-disc list-inside ml-5 space-y-1">
								<li><code>components/admin/postgres/export-all-collections.jsx</code>: Adapted for PostgreSQL exports.</li>
								<li><code>components/admin/postgres/import-table-direct.js</code>: Adapted for PostgreSQL imports.</li>
							</ul>
						</li>
					</ul>
					<p>
						Backup files are stored in <code>backup/export/</code> and <code>backup/import/</code>. Use <code>pg_dump</code> for manual backups:
					</p>
					<pre className="bg-primary/10 p-4 rounded-md font-mono text-sm">
						<code>pg_dump -U user -d recruitly &gt; backup/export/recruitly_backup.sql</code>
					</pre>
				</CardContent>
			</Card>
		</DocsContent>
	)
}

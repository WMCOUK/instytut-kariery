'use client'

import DocsContent from "@/components/landing/layout/docs/content"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle, Copy } from 'lucide-react'
import { useState } from "react"

export default function Database({ title, path }) {
	const [copied, setCopied] = useState(null)

	const handleCopy = (text, index) => {
		navigator.clipboard.writeText(text)
		setCopied(index)
		setTimeout(() => setCopied(null), 2000)
	}

	return (
		<DocsContent title={title} path={path}>
			<div className="space-y-8">
				<p>
					Learn how to set up and use MongoDB with Prisma in your Next.js application
				</p>

				<Card className="bg-card border-primary/10">
					<CardHeader>
						<CardTitle>1. Create a MongoDB Cluster</CardTitle>
						<CardDescription>Set up your MongoDB Atlas account and create a cluster</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<p>To begin using MongoDB, you'll need to create a cluster in MongoDB Atlas:</p>
						<ol className="list-decimal pl-6 space-y-2">
							<li>Visit the official <a href="https://www.mongodb.com/cloud/atlas" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">MongoDB Atlas website</a></li>
							<li>Sign up for an account or log in if you already have one</li>
							<li>Click on "Build a Cluster" and choose the free tier option</li>
							<li>Select your preferred cloud provider and region</li>
							<li>Click "Create Cluster" to finalize the setup</li>
						</ol>
						<Alert>
							<AlertTriangle className="h-4 w-4" />
							<AlertTitle>Important</AlertTitle>
							<AlertDescription>
								The cluster creation process may take a few minutes. You can proceed to the next steps while it's being set up.
							</AlertDescription>
						</Alert>
					</CardContent>
				</Card>

				<Card className="bg-card border-primary/10">
					<CardHeader>
						<CardTitle>2. Create a Database and User</CardTitle>
						<CardDescription>Set up your database and create a user with appropriate permissions</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<p>Once your cluster is ready, follow these steps to create a database and a user:</p>
						<ol className="list-decimal pl-6 space-y-2">
							<li>In the MongoDB Atlas dashboard, click on "Database Access" in the left sidebar</li>
							<li>Click "Add New Database User" and create a user with a secure password</li>
							<li>Set the appropriate permissions (e.g., "Read and write to any database")</li>
							<li>Go to "Network Access" and add your IP address or allow access from anywhere (0.0.0.0/0)</li>
							<li>Return to the "Databases" section and click "Connect"</li>
							<li>Choose "Connect your application" and copy the connection string</li>
						</ol>
						<div className="relative">
							<pre className="bg-primary/10 p-4 rounded-md overflow-x-hidden whitespace-pre-wrap">
								<code>{`DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.mongodb.net/myapp?retryWrites=true&w=majority"`}</code>
							</pre>
							<Button
								variant="outline"
								size="icon"
								className="absolute top-2 right-2"
								onClick={() => handleCopy('DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.mongodb.net/myapp?retryWrites=true&w=majority"', 0)}
							>
								{copied === 0 ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
							</Button>
						</div>

						<p>Replace <code>&lt;username&gt;</code> and <code>&lt;password&gt;</code> with your actual database user credentials.</p>
					</CardContent>
				</Card>

				<Card className="bg-card border-primary/10">
					<CardHeader>
						<CardTitle>3. Install Prisma and MongoDB Dependencies</CardTitle>
						<CardDescription>Add the necessary packages to your Next.js project</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<p>To connect your application to MongoDB using Prisma, install the following dependencies:</p>
						<div className="relative">
							<pre className="bg-primary/10 p-4 rounded-md overflow-x-auto">
								<code>{`npm install @prisma/client prisma`}</code>
							</pre>
							<Button
								variant="outline"
								size="icon"
								className="absolute top-2 right-2"
								onClick={() => handleCopy('npm install @prisma/client prisma', 1)}
							>
								{copied === 1 ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
							</Button>
						</div>
					</CardContent>
				</Card>

				<Card className="bg-card border-primary/10">
					<CardHeader>
						<CardTitle>4. Configure the MongoDB Connection with Prisma</CardTitle>
						<CardDescription>Set up a connection utility for your MongoDB database using Prisma</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<p>Create a file named <code>lib/prisma.js</code> in your project to handle the Prisma MongoDB connection:</p>
						<div className="relative">
							<pre className="bg-primary/10 p-4 rounded-md overflow-x-auto">
								<code>{`import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default prisma`}</code>
							</pre>
							<Button
								variant="outline"
								size="icon"
								className="absolute top-2 right-2"
								onClick={() => handleCopy(`import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default prisma`, 2)}
							>
								{copied === 2 ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
							</Button>
						</div>
					</CardContent>
				</Card>

				<Card className="bg-card border-primary/10">
					<CardHeader>
						<CardTitle>5. Using Prisma with MongoDB in Your Application</CardTitle>
						<CardDescription>Perform MongoDB operations using Prisma in your Next.js app</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Tabs defaultValue="queries">
							<TabsList>
								<TabsTrigger value="queries">Queries</TabsTrigger>
								<TabsTrigger value="models">Models</TabsTrigger>
							</TabsList>
							<TabsContent value="queries">
								<p>Use Prisma to run queries, like creating a user:</p>
								<pre className="bg-primary/10 p-4 rounded-md overflow-x-auto">
									<code>{`const user = await prisma.user.create({
  data: {
    name: "John Doe",
    email: "john.doe@example.com",
  },
})`}</code>
								</pre>
							</TabsContent>
							<TabsContent value="models">
								<p>Define Prisma models in your <code>schema.prisma</code> file like this:</p>
								<pre className="bg-primary/10 p-4 rounded-md overflow-x-auto">
									<code>{`model User {
  id    String @id @default(auto()) @map("_id") @db.ObjectId
  name  String
  email String @unique
}`}</code>
								</pre>
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
			</div>
		</DocsContent>
	)
}

"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input" // Added Input for social media fields
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"

// Lucide Icons
import { Github, Linkedin, LinkIcon, Twitter } from "lucide-react"

// Define the User type based on the provided structure


const InfoGrid = ({ data }) => (
	<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
		{data.map(({ label, value }) => (
			<div key={label}>
				<p className="text-sm font-medium text-muted-foreground">{label}</p>
				<p className="text-base text-foreground">
					{value !== undefined && value !== null && value !== "" ? String(value) : "-"}
				</p>
			</div>
		))}
	</div>
)

const ToggleGrid = ({ data }) => (
	<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
		{data.map(({ label, value }) => (
			<div key={label} className="flex items-center justify-between">
				<Label className="text-sm font-medium">{label}</Label>
				<Switch checked={value || false} />
			</div>
		))}
	</div>
)

export default function UserProfile({ user }) {
	const initials =
		user?.personal?.name
			?.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase() || "U"

	if (!user) {
		return <div className="p-6 text-center text-muted-foreground">Loading user data...</div>
	}

	return (
		<div className="py-6 space-y-8">
			{/* Profile Header Card with Cover Photo and Avatar */}
			<Card className="overflow-hidden relative">
				{user.personal?.coverPhoto ? (
					<div
						className="h-40 w-full bg-cover bg-center"
						style={{ backgroundImage: `url(${user.personal.coverPhoto})` }}
						aria-label="Cover photo"
					/>
				) : (
					<div className="h-40 w-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-semibold">
						No Cover Photo
					</div>
				)}
				<CardHeader className="flex flex-col items-center space-y-3 -mt-16 sm:-mt-20 pb-4 relative z-10">
					<Avatar className="h-28 w-28 border-4 border-background shadow-lg">
						<AvatarImage
							src={user.personal?.image || "/placeholder.svg?height=112&width=112&query=user profile avatar"}
							alt={`${user.personal?.name || "User"} avatar`}
						/>
						<AvatarFallback className="text-3xl font-semibold">{initials}</AvatarFallback>
					</Avatar>
					<div className="text-center">
						<CardTitle className="text-3xl font-bold text-foreground">
							{user.personal?.name || user.userName || "Unknown User"}
						</CardTitle>
						<p className="text-base text-muted-foreground">{user.email || "No email provided"}</p>
					</div>
					<Link href="/admin/settings" passHref>
						<Button className="mt-4">Edit Profile</Button>
					</Link>
				</CardHeader>
			</Card>

			{/* Admin Details Card */}
			<Card>
				<CardHeader>
					<CardTitle className="text-xl font-semibold border-b pb-2">Admin Details</CardTitle>
				</CardHeader>
				<CardContent>
					<InfoGrid
						data={[
							{ label: "Role", value: user.isRole },
							{ label: "Onboard", value: user.onboard },
							{ label: "Price ID", value: user.subPriceId },
							{ label: "Subscription ID", value: user.subscriptionID },
							{ label: "Subscription", value: user.isSubscription ? "Active" : "Inactive" },
							{ label: "Banned", value: user.isBanned ? "Yes" : "No" },
							{ label: "Email Verified", value: user.emailVerified ? "Yes" : "No" },
							{ label: "Stripe Customer ID", value: user.stripeCustomerId },
						]}
					/>
				</CardContent>
			</Card>

			{/* Personal Information Card */}
			<Card>
				<CardHeader>
					<CardTitle className="text-xl font-semibold border-b pb-2">Personal Information</CardTitle>
				</CardHeader>
				<CardContent>
					<InfoGrid
						data={[
							{ label: "Designation", value: user.personal?.designation },
							{ label: "Bio", value: user.personal?.bio },
							{ label: "Address", value: user.personal?.address },
							{ label: "Phone", value: user.personal?.phone },
							{ label: "State", value: user.personal?.state },
							{ label: "City", value: user.personal?.city },
							{ label: "Country", value: user.personal?.country },
							{ label: "Gender", value: user.personal?.gender },
							{
								label: "Date of Birth",
								value: user.personal?.dateOfBirth && new Date(user.personal.dateOfBirth).toLocaleDateString(),
							},
							{ label: "Postal Code", value: user.personal?.postalCode },
							{ label: "Website", value: user.personal?.website },
						]}
					/>
				</CardContent>
			</Card>

			{/* Notification Preferences Card */}
			<Card>
				<CardHeader>
					<CardTitle className="text-xl font-semibold border-b pb-2">Notification Preferences</CardTitle>
				</CardHeader>
				<CardContent>
					<ToggleGrid
						data={[
							{ label: "Shortlist Notification", value: user.preference?.notifyOnShortlist },
							{ label: "Expire Notification", value: user.preference?.notifyOnExpire },
							{ label: "Job Alert", value: user.preference?.notifyOnJobAlert },
							{ label: "Saved Notification", value: user.preference?.notifyOnSaved },
							{ label: "Rejected Notification", value: user.preference?.notifyOnRejected },
						]}
					/>
				</CardContent>
			</Card>

			{/* Privacy Settings Card */}
			<Card>
				<CardHeader>
					<CardTitle className="text-xl font-semibold border-b pb-2">Privacy Settings</CardTitle>
				</CardHeader>
				<CardContent>
					<ToggleGrid
						data={[
							{ label: "Public Profile", value: user.preference?.isProfilePublic },
							{ label: "Public Resume", value: user.preference?.isResumePublic },
						]}
					/>
				</CardContent>
			</Card>

			{/* Social Media Card */}
			<Card>
				<CardHeader>
					<CardTitle className="text-xl font-semibold border-b pb-2">Social Media</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
					<div className="flex items-center space-x-2">
						<Linkedin className="w-5 h-5 text-blue-600" />
						<div className="flex-1">
							<Label htmlFor="linkedin" className="sr-only">
								LinkedIn
							</Label>
							<Input id="linkedin" placeholder="LinkedIn URL" value={user.social?.linkedin || ""} readOnly />
						</div>
					</div>
					<div className="flex items-center space-x-2">
						<Github className="w-5 h-5 text-gray-800" />
						<div className="flex-1">
							<Label htmlFor="github" className="sr-only">
								GitHub
							</Label>
							<Input id="github" placeholder="GitHub URL" value={user.social?.github || ""} readOnly />
						</div>
					</div>
					<div className="flex items-center space-x-2">
						<Twitter className="w-5 h-5 text-blue-400" />
						<div className="flex-1">
							<Label htmlFor="twitter" className="sr-only">
								Twitter
							</Label>
							<Input id="twitter" placeholder="Twitter URL" value={user.social?.twitter || ""} readOnly />
						</div>
					</div>
					<div className="flex items-center space-x-2">
						<LinkIcon className="w-5 h-5 text-gray-500" />
						<div className="flex-1">
							<Label htmlFor="website" className="sr-only">
								Personal Website
							</Label>
							<Input id="website" placeholder="Personal Website URL" value={user.social?.website || ""} readOnly />
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

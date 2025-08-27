import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SocialMediaCreateForm({ user }) {
	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

				{/* LinkedIn */}
				<div>
					<Label htmlFor="linkedin">LinkedIn</Label>
					<Input id="linkedin" placeholder="Your LinkedIn Name" defaultValue={user?.linkedin || ''} />
				</div>
				<div>
					<Label htmlFor="linkedinUrl">LinkedIn URL</Label>
					<Input id="linkedinUrl" placeholder="https://linkedin.com/in/username" defaultValue={user?.linkedinUrl || ''} />
				</div>

				{/* GitHub */}
				<div>
					<Label htmlFor="github">GitHub</Label>
					<Input id="github" placeholder="Your GitHub Username" defaultValue={user?.github || ''} />
				</div>
				<div>
					<Label htmlFor="githubUrl">GitHub URL</Label>
					<Input id="githubUrl" placeholder="https://github.com/username" defaultValue={user?.githubUrl || ''} />
				</div>

				{/* Twitter */}
				<div>
					<Label htmlFor="twitter">Twitter</Label>
					<Input id="twitter" placeholder="Your Twitter Handle" defaultValue={user?.twitter || ''} />
				</div>
				<div>
					<Label htmlFor="twitterUrl">Twitter URL</Label>
					<Input id="twitterUrl" placeholder="https://twitter.com/username" defaultValue={user?.twitterUrl || ''} />
				</div>

				{/* Personal Website */}
				<div className="md:col-span-2">
					<Label htmlFor="website">Personal Website</Label>
					<Input id="website" placeholder="https://yourwebsite.com" defaultValue={user?.website || ''} />
				</div>

			</div>

			{/* Save Button */}
			<div className="flex justify-end">
				<Button type="submit">Save Social Media</Button>
			</div>
		</>
	)
}

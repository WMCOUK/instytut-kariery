import RatingJobButton from "@/components/admin/elements/RatingRecruiterSection"
import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import { Button } from "@/components/ui/button"
import { formatDate, formatTime } from "@/utils"
import { getJobDetails } from "@/utils/fetchServer"
import { Circle, Facebook, Heart, Instagram, Linkedin, MapPin, Share, Twitter } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

export async function generateMetadata({ params }) {
	const { slug } = await params
	const job = await getJobDetails(slug)
	return {
		title: job?.title,
	}
}

export default async function JobDetails({ params }) {
	const { slug } = await params
	const job = await getJobDetails(slug)
	const formattedDate = formatDate(job?.createdAt)
	const formattedTime = formatTime(job?.createdAt)

	// console.log(job);


	return (
		<LayoutAdmin>
			<div className="container mx-auto px-4">
				<div className="h-72 mt-10 rounded-3xl relative bg-primary/5" style={{ backgroundImage: `url(${job?.recruiter?.coverPhoto})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
					<Image
						height={100}
						width={100}
						src={job?.recruiter?.image}
						alt=""
						className='rounded-2xl absolute -bottom-10 left-10 border-4 border-background'
					/>
				</div>
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-16 mb-16">
					<div>
						<span className="text-muted-foreground text-base">{job?.recruiter?.title}</span>
						<h2 className="text-3xl font-bold text-foreground mt-2 mb-3">{job?.title}</h2>
						<div>
							<span className="flex items-center text-muted-foreground">
								<MapPin className='mr-1 h-4 w-4' />
								{job?.recruiter?.city}
							</span>
						</div>
					</div>
					<div className="mt-4 md:mt-0">
						<div className='flex items-center space-x-3'>
							<Button variant="outline" size="icon" className="rounded-full">
								<Heart className="h-4 w-4" />
							</Button>
							<Button variant="outline" size="icon" className="rounded-full">
								<Share className="h-4 w-4" />
							</Button>
							<Button>Apply Now</Button>
						</div>
						<p className='text-right mt-3 text-muted-foreground text-sm'>{formattedTime}</p>
					</div>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-6 gap-16 mb-24">
					<div className="lg:col-span-3 xl:col-span-4">
						<div className="overview mb-10">
							<h4 className='text-xl font-semibold mb-3'>Description</h4>
							<p className='text-muted-foreground leading-relaxed'>{job?.description}</p>
						</div>
						<div
							dangerouslySetInnerHTML={{ __html: job?.content || '' }}
							className="text-muted-foreground leading-relaxed mb-10"
						/>
						<div className="mb-10">
							<h4 className='text-xl font-semibold mb-3'>Benefits</h4>
							<div className="space-y-3">
								{job?.benefit?.map((benefit, index) => (
									<div
										key={index}
										className="flex items-center gap-3 text-muted-foreground"
									>
										<Circle className="h-2 w-2 text-primary" />
										{benefit}
									</div>
								))}
							</div>
						</div>
						<div className="mb-10">
							<h4 className='text-xl font-semibold mb-3'>Skills</h4>
							<div className="flex flex-wrap gap-2">
								{job?.skills?.map((skill, i) => (
									<span
										key={i}
										className='bg-primary/10 text-primary text-sm px-3 py-1 rounded-full capitalize'
									>
										{skill}
									</span>
								))}
							</div>
						</div>
						<Button size="lg">Apply Now</Button>
						<RatingJobButton
							jobTitle={job?.title}
							jobSlug={job?.slug}
							userRating={job?.rating?.rating}
							averageRating={job?.averageRating}
						/>
					</div>
					<div className="lg:col-span-2 xl:col-span-2 space-y-8">
						<div className="bg-card rounded-xl px-7 py-10">
							<JobInfoItem label="Experience" value={job?.jobExperience?.title} />
							<JobInfoItem label="Work Level" value={job?.jobPosition?.title} />
							<JobInfoItem label="Employment Type" value={job?.jobType?.title} />
							<JobInfoItem label="Salary" value={`${job?.minSalary}k - ${job?.maxSalary}k / year`} />
						</div>
						<div className="bg-card rounded-xl px-7 py-10">
							<div className="flex items-center mb-6">
								<Image
									width={50}
									height={50}
									src={job?.recruiter?.image}
									alt=""
									className="rounded-xl"
								/>
								<div className='ml-3'>
									<h5 className='font-medium text-foreground'>{job?.recruiter?.title}</h5>
									<Link
										className="text-sm flex items-center text-primary"
										href={`/recruiters/${job?.recruiter?.slug}`}
									>
										View Profile
									</Link>
								</div>
							</div>
							<JobInfoItem label="Industry" value={job?.jobIndustry?.title} />
							<JobInfoItem label="Company size" value={`${job?.recruiter?.numberOfEmployees} employees`} />
							<JobInfoItem label="Founded in" value={job?.recruiter?.yearFounded} />
							<JobInfoItem label="Phone" value={job?.recruiter?.phone} />
							<JobInfoItem label="Email" value={job?.recruiter?.email} />
							<JobInfoItem label="Location" value={job?.recruiter?.city} />
							<JobInfoItem
								label="Website"
								value={job?.recruiter?.website}
								isLink
							/>
							<div className='flex pt-4 space-x-4'>
								<SocialLink href="#" Icon={Facebook} />
								<SocialLink href="#" Icon={Linkedin} />
								<SocialLink href="#" Icon={Twitter} />
								<SocialLink href="#" Icon={Instagram} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</LayoutAdmin>
	)
}

function JobInfoItem({ label, value, isLink = false }) {
	return (
		<div className='mb-5 last:mb-0'>
			<span className='text-sm text-muted-foreground block mb-1'>{label}</span>
			{isLink ? (
				<Link href="#" className='text-md font-medium text-primary hover:underline'>
					{value}
				</Link>
			) : (
				<h5 className='text-md font-medium text-foreground'>{value}</h5>
			)}
		</div>
	)
}

function SocialLink({ href, Icon }) {
	return (
		<Link
			href={href}
			className='inline-block text-muted-foreground hover:text-primary transition-colors'
		>
			<Icon className="h-5 w-5" />
		</Link>
	)
}


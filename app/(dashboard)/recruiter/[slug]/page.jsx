import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import RecruiterJobGrid1 from "@/components/landing/elements/recruiter/RecruiterJobGrid1"
import { Card, CardContent } from "@/components/ui/card"
import { formatDate } from "@/utils"
import { getRecruiterDetails } from "@/utils/fetchServer"
import { Facebook, Instagram, Linkedin, MapPin, Twitter } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

export async function generateMetadata({ params }) {
	const { slug } = await params
	const recruiter = await getRecruiterDetails(slug)
	return {
		title: recruiter?.title,
	}
}

export default async function RecruiterDetails({ params }) {
	const { slug } = await params
	const recruiter = await getRecruiterDetails(slug)
	const formattedDate = formatDate(recruiter?.createdAt)

	return (
		<LayoutAdmin>
			<div className="container">
				<div className="h-72 mt-10 rounded-xl relative bg-muted" style={{ backgroundImage: `url(${recruiter?.coverPhoto})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
					<Image height={100} width={100} src={recruiter?.image} alt="" className='rounded-2xl absolute -bottom-10 left-10 border-4 border-background' />
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-6 gap-16 mb-24 mt-16">
					<div className="lg:col-span-3 xl:col-span-4">
						<div className='mb-16'>
							<div className='mb-2'>
								<span className="flex items-center text-primary">
									<MapPin className='mr-1 h-4 w-4' />
									{recruiter?.city}
								</span>
							</div>
							<h2 className="text-3xl font-bold text-foreground">{recruiter?.title}</h2>
						</div>
						<div className="mb-12">
							<h4 className='mb-3 text-xl font-semibold text-foreground'>About {recruiter?.title}</h4>
							<p className='text-muted-foreground leading-relaxed'>{recruiter?.description}</p>
						</div>

						<div className="mb-12">
							<h4 className='mb-3 text-xl font-semibold text-foreground'>Details</h4>
							<div dangerouslySetInnerHTML={{ __html: recruiter?.content || "" }} className="text-muted-foreground" />
						</div>
						{
							recruiter?.job?.map((item, i) => (
								<div className="mb-5" key={i}>
									<RecruiterJobGrid1 item={item} />
								</div>
							))
						}
					</div>
					<div className="lg:col-span-2 xl:col-span-2">
						<Card>
							<CardContent className="px-7 py-10">
								<div className="flex items-center mb-4">
									<Image
										width={50}
										height={50}
										src={recruiter?.image}
										alt=""
										className="rounded-xl"
									/>
									<div className='ml-3'>
										<h5 className='font-medium text-foreground'>{recruiter?.title}</h5>
										<Link className="text-sm flex items-center text-primary" href="#">
											View Profile
										</Link>
									</div>
								</div>
								<RecruiterInfoItem label="Industry" value={recruiter?.jobIndustry?.title} />
								<RecruiterInfoItem label="Company size" value={`${recruiter?.numberOfEmployees} employees`} />
								<RecruiterInfoItem label="Founded in" value={recruiter?.yearFounded} />
								<RecruiterInfoItem label="Phone" value={recruiter?.phone} />
								<RecruiterInfoItem label="Email" value={recruiter?.email} />
								<RecruiterInfoItem label="Location" value={recruiter?.city} />
								<RecruiterInfoItem label="Website" value={recruiter?.website} isLink />

								<div className='flex pt-4 space-x-4'>
									<SocialLink href="#" Icon={Facebook} />
									<SocialLink href="#" Icon={Linkedin} />
									<SocialLink href="#" Icon={Twitter} />
									<SocialLink href="#" Icon={Instagram} />
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</LayoutAdmin>
	)
}

function RecruiterInfoItem({ label, value, isLink = false }) {
	return (
		<div className='mb-5'>
			<span className='text-sm text-muted-foreground block'>{label}</span>
			{isLink ? (
				<Link href="#" className='text-md font-medium text-primary hover:underline'>{value}</Link>
			) : (
				<h5 className='text-md font-medium text-foreground'>{value}</h5>
			)}
		</div>
	)
}

function SocialLink({ href, Icon }) {
	return (
		<Link href={href} className='text-muted-foreground hover:text-primary transition-colors'>
			<Icon className="h-5 w-5" />
		</Link>
	)
}


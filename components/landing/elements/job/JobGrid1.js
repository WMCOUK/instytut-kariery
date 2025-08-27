'use client'

import { formatTime } from '@/utils'
import { Clock, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import FavouriteJobButton from '../candidates/FavouriteJobButton'

import { Badge } from "@/components/ui/badge"
export default function JobGrid1({ item }) {
	const formattedTime = formatTime(item?.createdAt)

	return (
		<div className="group">
			<div className="relative p-4 rounded-xl bg-card border group-hover:bg-primary transition duration-150">
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<Image
							width={40}
							height={40}
							src={item?.recruiter?.image || item?.job?.recruiter?.image || '/images/placeholder.svg'}
							alt={`${item?.recruiter?.title} logo`}
							className="rounded-xl"
						/>
						<div className='ml-4'>
							<h5 className='font-base text-primary group-hover:text-primary-foreground transition duration-150'>{item?.recruiter?.title}</h5>
							<span className="flex items-center text-sm text-muted-foreground group-hover:text-primary-foreground transition duration-150">
								<MapPin className='mr-1 h-3 w-3' />
								{item?.jobLocation?.title}
							</span>
						</div>
					</div>
					<div className="flex items-center justify-between space-x-2">
						{item?.isSponsored && (
							<Badge variant="destructive">
								Sponsored
							</Badge>
						)}

						<FavouriteJobButton
							jobTitle={item?.title}
							jobSlug={item?.slug}
							initialFavourite={item?.isFavourite}
							className='h-4 w-4' />
					</div>
				</div>
				<Link href={`/jobs/${item?.slug}`}>
					<h4 className='mt-4 text-md font-medium text-foreground group-hover:text-primary-foreground'>{item?.title}</h4>
				</Link>
				<div className="my-3">
					{item?.skills?.slice(0, 2).map((skill, i) => (
						<span key={i} className='bg-primary/10 shadow-sm text-xs px-3 py-1 rounded-xl mr-2 text-primary capitalize group-hover:bg-primary-foreground group-hover:text-primary'>{skill}</span>
					))}
				</div>
				<div className="flex items-center justify-between mt-3">
					<div className="flex items-center text-muted-foreground group-hover:text-primary-foreground">
						<Clock className="h-4 w-4" />
						<span className='ml-2 text-sm group-hover:text-primary-foreground'>{formattedTime}</span>
					</div>
					<div className="text-foreground group-hover:text-primary-foreground">${item?.minSalary}k <small className='text-sm text-muted-foreground group-hover:text-primary-foreground'>/ Yearly</small></div>
				</div>
			</div>
		</div>
	)
}


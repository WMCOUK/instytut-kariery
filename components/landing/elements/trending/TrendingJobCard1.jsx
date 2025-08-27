'use client'

import { formatTime } from '@/utils'
import { Clock } from 'lucide-react'
import Link from 'next/link'
// import FavouriteJobButton from '../candidates/FavouriteJobButton'

export default function TrendingJobCard1({ item }) {
	const formattedTime = formatTime(item?.createdAt)

	return (
		<div className="group">
			<div className="relative p-4 rounded-xl bg-card border group-hover:bg-primary transition duration-150">
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


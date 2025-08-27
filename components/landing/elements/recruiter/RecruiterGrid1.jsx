
import { Card, CardContent } from "@/components/ui/card"
import { truncateToWords } from '@/utils'
import { MapPinIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function RecruiterGrid1({ item }) {
	const description = truncateToWords(item?.description, 20)

	return (
		<Link href={`/recruiters/${item?.slug}`} className='block'>
			<Card className="transition-shadow hover:shadow-md">
				<CardContent className="p-6">
					<div className="flex items-center mb-3">
						<Image
							width={50}
							height={50}
							src={item?.image}
							alt={item?.title}
							className="rounded-lg"
						/>
						<div className='ml-3'>
							<h4 className='font-medium text-lg text-foreground'>{item?.title}</h4>
							<span className="text-sm flex items-center text-muted-foreground">
								<MapPinIcon className='mr-1 h-4 w-4' />
								{item?.city}, {item?.country}
							</span>
						</div>
					</div>
					<p className='text-muted-foreground leading-relaxed py-3'>
						{description}
					</p>
					<div className="mt-3 font-medium text-foreground">{item?.job?.length} Jobs</div>
				</CardContent>
			</Card>
		</Link>
	)
}




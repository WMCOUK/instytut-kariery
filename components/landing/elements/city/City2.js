import Image from 'next/image'
import Link from 'next/link'

export default function City2({ item }) {
	return (
		<>
			<Link href={`/jobs?jobLocation=${item.slug}`} className='block group'>
				<div className="relative text-center px-3 py-5 rounded-xl bg-transparent">
					<Image
						width={0}
						height={0}
						sizes="100vw"
						src={`${item.image ? item.image : '/images/placeholder.svg'}`}
						alt={item.title}
						className="rounded-xl mx-auto h-32 w-full group-hover:scale-110 ease-in duration-300 object-cover"
					/>
					<h4 className='mt-4 mb-1 text-xl font-medium text-foreground'>{item.title}</h4>
					<p className='text-sm text-muted-foreground'>{item?.job?.length} Open Positions</p>
				</div>
			</Link>
		</>
	)
}


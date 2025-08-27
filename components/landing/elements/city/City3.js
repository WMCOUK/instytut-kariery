import Image from 'next/image'
import Link from 'next/link'

export default function City3({ item }) {
	return (
		<>
			<Link href={`/jobs?jobLocation=${item?.slug}`} className='block group'>
				<div className="relative px-3 py-5 rounded-3xl text-center">
					<Image
						// fill
						width="0"
						height="0"
						sizes="100vw"
						// style={{ width: "auto", height: "auto" }}
						src={`${item.image ? item?.image : '/images/placeholder.svg'}`}
						alt=""
						className="rounded-full mx-auto w-full group-hover:scale-110 ease-in duration-300"
					/>
					<h4 className='mt-3 text-lg font-medium'>{item?.title}</h4>
					<p className='text-sm text-gray-500'>{item?.job?.length} Open Positions</p>
				</div>
			</Link>
		</>
	)
}

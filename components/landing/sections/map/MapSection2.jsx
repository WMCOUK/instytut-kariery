'use client'
import dynamic from "next/dynamic"

const MapLeaflet2 = dynamic(() => import("@/components/landing/elements/map/MapLeaflet2"), {
	ssr: false,
})

export default function MapSection2() {
	return (
		<>
			   <MapLeaflet2 />
		</>
	)
}

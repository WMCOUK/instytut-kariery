'use client'
import dynamic from "next/dynamic"

const MapLeaflet1 = dynamic(() => import("@/components/landing/elements/map/MapLeaflet1"), {
	ssr: false,
})

export default function MapSection1() {
	return (
		<>
			<MapLeaflet1 />
			<style jsx global>{`
        .custom-icon {
          background: none;
          border: none;
        }
        .leaflet-popup-content-wrapper {
          padding: 0;
          overflow: hidden;
        }
        .leaflet-popup-content {
          margin: 0;
          padding: 16px;
        }
      `}</style>
		</>
	)
}

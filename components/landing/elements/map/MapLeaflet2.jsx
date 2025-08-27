"use client"

import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { useEffect, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

// Update the createCustomIcon function to use a filled SVG icon
const createCustomIcon = () => {
	// Create a DOM element to render the SVG
	const customIcon = L.divIcon({
		html: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#f43f5e" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" class="text-primary">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
      <circle cx="12" cy="10" r="3" fill="white"></circle>
    </svg>`,
		className: "custom-marker-icon",
		iconSize: [48, 48],
		iconAnchor: [24, 48],
		popupAnchor: [0, -48],
	})

	return customIcon
}

// Update the MapSection component to include default values for props
export default function MapSection2({
	title = "London Headquarters",
	imageUrl = "/images/placeholder.svg?height=100&width=200",
	address = "123 Oxford Street, London, UK",
	description = "Our main office located in the heart of London.",
}) {
	const [isMounted, setIsMounted] = useState(false)
	const position = [51.505, -0.09]

	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) {
		return null
	}

	return (
		<div className="h-[400px] w-full">
			<MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<Marker position={position} icon={createCustomIcon()}>
					<Popup className="leaflet-popup-content-wrapper">
						<div className="flex flex-col gap-2">
							<h3 className="font-medium text-lg">{title}</h3>
							{imageUrl && (
								<div className="w-full h-[100px] overflow-hidden rounded-md">
									<img src={imageUrl || "/images/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
								</div>
							)}
							<p className="text-sm text-muted-foreground" style={{margin: 0}}>{address}</p>
							<span className="text-sm">{description}</span>
						</div>
					</Popup>
				</Marker>
			</MapContainer>
		</div>
	)
}


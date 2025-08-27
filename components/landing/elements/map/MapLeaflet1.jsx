"use client"

import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Clock, Globe, MapPin, Phone } from "lucide-react"
import Image from "next/image"
import { forwardRef, useEffect, useRef, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"

// Create a custom icon using a centered MapPin with primary color fill
const createCustomIcon = () => {
	const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="hsl(var(--primary))" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  `
	const iconUrl = `data:image/svg+xml;base64,${btoa(svg)}`

	return L.divIcon({
		html: `<img src="${iconUrl}" style="width:36px; height:36px;">`,
		className: "custom-icon",
		iconSize: [36, 36],
		iconAnchor: [18, 36],
		popupAnchor: [0, -36],
	})
}

// Custom component to handle marker click and popup content
const MarkerComponent = forwardRef(({ position }, ref) => {
	const map = useMap()
	const markerRef = useRef < L.Marker > (null)

	useEffect(() => {
		if (markerRef.current) {
			markerRef.current.on("click", () => {
				map.setView(position, map.getZoom(), {
					animate: true,
					pan: {
						duration: 0.5,
					},
				})
			})
		}
	}, [map, position])

	return (
		<Marker position={position} icon={createCustomIcon()} ref={markerRef}>
			<Popup minWidth={300} maxWidth={300}>
				<div className="flex flex-col space-y-4">
					<Image src="/placeholder.svg" alt="Big Ben" width={280} height={160} className="rounded-md object-cover" />
					<h3 className="text-lg font-semibold text-primary">Big Ben</h3>
					<ul className="space-y-2">
						<li className="flex items-start space-x-2">
							<MapPin className="w-5 h-5 text-primary mt-0.5" />
							<span className="text-sm text-muted-foreground">Westminster, London SW1A 0AA, United Kingdom</span>
						</li>
						<li className="flex items-start space-x-2">
							<Clock className="w-5 h-5 text-primary mt-0.5" />
							<span className="text-sm text-muted-foreground">Open 24 hours</span>
						</li>
						<li className="flex items-start space-x-2">
							<Phone className="w-5 h-5 text-primary mt-0.5" />
							<span className="text-sm text-muted-foreground">+44 20 7219 4272</span>
						</li>
						<li className="flex items-start space-x-2">
							<Globe className="w-5 h-5 text-primary mt-0.5" />
							<a
								href="https://www.parliament.uk/bigben"
								target="_blank"
								rel="noopener noreferrer"
								className="text-sm text-primary hover:underline"
							>
								www.parliament.uk/bigben
							</a>
						</li>
					</ul>
				</div>
			</Popup>
		</Marker>
	)
})

MarkerComponent.displayName = "MarkerComponent"

export default function MapLeaflet1() {
	const [isMounted, setIsMounted] = useState(false)
	const position = [51.500729, -0.124625] // Coordinates for Big Ben

	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) {
		return <div>Loading map...</div>
	}

	return (
		<div className="h-[400px] w-full">
			<MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<MarkerComponent position={position} />
			</MapContainer>
		</div>
	)
}


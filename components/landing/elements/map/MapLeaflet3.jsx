'use client'

import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { useEffect, useState } from "react"
import { CircleMarker, MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"

// Red pin icon for job markers
const createJobIcon = () => {
	const jobIcon = L.divIcon({
		html: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#f43f5e" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" class="text-primary">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
      <circle cx="12" cy="10" r="3" fill="white"></circle>
    </svg>`,
		className: "job-marker-icon",
		iconSize: [48, 48],
		iconAnchor: [24, 48],
		popupAnchor: [0, -48],
	})
	return jobIcon
}

// Blue marker for user location
const createUserIcon = () => {
	const userIcon = L.divIcon({
		html: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#3b82f6" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
      <circle cx="12" cy="10" r="3" fill="white"></circle>
    </svg>`,
		className: "user-marker-icon",
		iconSize: [48, 48],
		iconAnchor: [24, 48],
		popupAnchor: [0, -48],
	})
	return userIcon
}

// Circle with job count for zoomed-out view
const createClusterIcon = (count) => {
	return L.divIcon({
		html: `
      <div style="
        background-color: #f43f5e;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 16px;
        border: 2px solid white;
        box-shadow: 0 0 5px rgba(0,0,0,0.3);
      ">
        ${count}
      </div>`,
		className: "job-cluster-icon",
		iconSize: [40, 40],
		iconAnchor: [20, 20],
		popupAnchor: [0, -20],
	})
}

// Component to handle zoom-based rendering
function ZoomHandler({ jobs, userPosition, center }) {
	const map = useMap()
	const [zoomLevel, setZoomLevel] = useState(map.getZoom())

	useEffect(() => {
		const handleZoom = () => {
			setZoomLevel(map.getZoom())
		}
		map.on('zoomend', handleZoom)
		return () => {
			map.off('zoomend', handleZoom)
		}
	}, [map])

	const validJobs = jobs.filter(job => job.latitude && job.longitude)
	const zoomThreshold = 10 // Switch between cluster and individual markers at zoom level 10

	return (
		<>
			{userPosition && (
				<Marker
					position={userPosition}
					icon={createUserIcon()}
				>
					<Popup>
						<div className="flex flex-col gap-2">
							<h3 className="font-medium text-lg">Your Location</h3>
							<p className="text-sm text-muted-foreground">Current position</p>
						</div>
					</Popup>
				</Marker>
			)}
			{zoomLevel < zoomThreshold && validJobs.length > 0 ? (
				<CircleMarker
					center={center}
					radius={20}
					fillColor="#f43f5e"
					color="#fff"
					weight={2}
					fillOpacity={0.6}
					icon={createClusterIcon(validJobs.length)}
				>
					<Popup>
						<div className="flex flex-col gap-2">
							<h3 className="font-medium text-lg">{validJobs.length} Jobs</h3>
							<p className="text-sm text-muted-foreground">Jobs in this area</p>
						</div>
					</Popup>
				</CircleMarker>
			) : (
				validJobs.map((job, index) => (
					<Marker
						key={index}
						position={[parseFloat(job.latitude), parseFloat(job.longitude)]}
						icon={createJobIcon()}
					>
						<Popup className="leaflet-popup-content-wrapper">
							<div className="flex flex-col gap-2">
								<h3 className="font-medium text-lg">{job.title}</h3>
								{job.image && (
									<div className="w-full h-[100px] overflow-hidden rounded-md">
										<img src={job.image || "/images/placeholder.svg"} alt={job.title} className="w-full h-full object-cover" />
									</div>
								)}
								<p className="text-sm text-muted-foreground" style={{ margin: 0 }}>
									{job.jobLocation?.title || "Unknown Location"}
								</p>
								<span className="text-sm">{job.description || "No description available"}</span>
							</div>
						</Popup>
					</Marker>
				))
			)}
		</>
	)
}

export default function MapLeaflet3({ jobs = [] }) {
	const [isMounted, setIsMounted] = useState(false)
	const [userPosition, setUserPosition] = useState(null)
	const [geoError, setGeoError] = useState(null)
	const defaultPosition = [51.505, -0.09] // Fallback center (London)

	useEffect(() => {
		setIsMounted(true)
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords
					setUserPosition([latitude, longitude])
					setGeoError(null)
				},
				(error) => {
					setGeoError("Unable to retrieve your location. Using default map center.")
					setUserPosition(defaultPosition)
				}
			)
		} else {
			setGeoError("Geolocation is not supported by this browser.")
			setUserPosition(defaultPosition)
		}
	}, [])

	if (!isMounted || !userPosition) {
		return null
	}

	const validJobs = jobs.filter(job => job.latitude && job.longitude)
	const center = validJobs.length > 0
		? [
			validJobs.reduce((sum, job) => sum + parseFloat(job.latitude), 0) / validJobs.length,
			validJobs.reduce((sum, job) => sum + parseFloat(job.longitude), 0) / validJobs.length
		]
		: userPosition

	return (
		<div className="h-[600px] w-full mb-5">
			<MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<ZoomHandler jobs={jobs} userPosition={userPosition} center={center} />
			</MapContainer>
			{geoError && (
				<p className="text-sm text-red-500 mt-2 text-center">{geoError}</p>
			)}
		</div>
	)
}
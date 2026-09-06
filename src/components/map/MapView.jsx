import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix default marker icon path issue with bundlers
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.openstreetmap.org/ns/svg" viewBox="0 0 25 41"><circle cx="12.5" cy="12.5" r="12.5" fill="%23ef4444" stroke="%23fff" stroke-width="2"/></svg>',
  shadowUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.openstreetmap.org/ns/svg" viewBox="0 0 25 41"><circle cx="12.5" cy="35" r="5" fill="%23000" opacity="0.3"/></svg>',
})

export function MapView({
  hospitals,
  center = [0, 0],
  zoom = 4,
  height = 'h-96',
  userLocation,
  routes,
}) {
  return (
    <div
      className={`rounded-lg overflow-hidden border ${height}`}
      role="img"
      aria-label="Hospital map"
      style={{ height: height?.startsWith('h-') ? '24rem' : height }}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {hospitals.map((hospital) => (
          <Marker
            key={hospital.id}
            position={[hospital.latitude, hospital.longitude]}
            icon={L.divIcon({
              className: 'custom-hospital-marker',
              html: `<div style="background:${
                hospital.isActive ? '#22c55e' : '#ef4444'
              };width:24px;height:24px;border-radius:50%;border:2px solid #fff;box-shadow:0 2px 4px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:bold;">${
                hospital.specializations[0]?.[0] ?? 'H'
              }</div>` +
                (hospital.acceptsInsurance && hospital.acceptsInsurance.length > 0
                  ? `<span style="position:absolute;bottom:-6px;left:50%;transform:translateX(-50%);display:flex;gap-1;flex-wrap:wrap;">
                      ${hospital.acceptsInsurance.map((code) => (
                        `<span key="${code}" className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-gray-200 text-gray-700">${code}</span>`
                      ))}
                    </span>`
                  : ''),
              iconSize: [24, 24],
              iconAnchor: [12, 12],
              popupAnchor: [0, -12],
            })}
          />
        ))}
        {routes && routes.map((route, idx) => (
          <Polyline
            key={`${route.hospital.id}-${idx}`}
            positions={route.path.coordinates}
            pathOptions={{
              color: route.path.color || '#3b82f6',
              weight: 4,
              opacity: 0.8,
            }}
          />
        ))}
        {userLocation && (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#3b82f6',
              border: '2px solid white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
            aria-label="User location"
          />
        )}
      </MapContainer>
    </div>
  )
}
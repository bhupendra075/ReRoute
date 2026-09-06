import { MapView } from '@/components/map/MapView'

export function LiveMap({ hospitals }) {
  const firstHospital = hospitals[0]
  const center = firstHospital
    ? [firstHospital.latitude, firstHospital.longitude]
    : [40.7128, -74.006]
  const zoom = hospitals.length > 0 ? 13 : 12
  return <MapView hospitals={hospitals} center={center} zoom={zoom} height="h-[500px]" />
}
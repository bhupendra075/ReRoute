import { MapView } from '@/components/map/MapView'
import type { Hospital } from '@/types/hospital'

interface LiveMapProps {
  hospitals: Hospital[]
}

export function LiveMap({ hospitals }: LiveMapProps) {
  const firstHospital = hospitals[0]
  const center = firstHospital
    ? [firstHospital.latitude, firstHospital.longitude] as [number, number]
    : [40.7128, -74.006] as [number, number]
  const zoom = hospitals.length > 0 ? 13 : 12
  return <MapView hospitals={hospitals} center={center} zoom={zoom} height="h-[500px]" />
}

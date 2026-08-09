import { MapView } from '@/components/map/MapView'
import type { Hospital } from '@/types'

interface LiveMapProps {
  hospitals: Hospital[]
}

export function LiveMap({ hospitals }: LiveMapProps) {
  return <MapView hospitals={hospitals} center={[40.7128, -74.006]} zoom={12} height="h-[500px]" />
}

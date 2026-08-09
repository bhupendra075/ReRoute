import type { Hospital } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { formatDistance, formatETA } from '@/utils/helpers'

interface RouteCardProps {
  hospital: Hospital
  distanceMeters: number
  etaSeconds: number
  onClick?: () => void
}

export function RouteCard({ hospital, distanceMeters, etaSeconds, onClick }: RouteCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick} role="button" tabIndex={0}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{hospital.name}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <dl className="space-y-1 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-500">Distance</dt>
            <dd className="font-medium">{formatDistance(distanceMeters)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">ETA</dt>
            <dd className="font-medium">{formatETA(etaSeconds)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Specializations</dt>
            <dd className="font-medium">{hospital.specializations.join(', ') || 'General'}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Address</dt>
            <dd className="font-medium">{hospital.address ?? 'N/A'}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}

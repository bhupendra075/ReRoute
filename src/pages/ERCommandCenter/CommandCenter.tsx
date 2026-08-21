import { TriageQueue } from '@/components/triage/TriageQueue'
import { MapView } from '@/components/map/MapView'
import { InsuranceMatrix } from './InsuranceMatrix'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import type { Hospital, EmergencySession } from '@/types'
import type { InsuranceTPA } from '@/types/hospital'

const mockHospitals: Hospital[] = [
  {
    id: 'demo-1',
    name: 'Mumbai General Hospital',
    latitude: 19.076,
    longitude: 72.8777,
    address: 'Parel, Mumbai',
    phone: '(555) 123-4567',
    specializations: ['ICU', 'TRAUMA', 'CARDIAC'],
    capacity: { ICU: 5, CARDIAC: 3, STROKE: 2, BURN: 1, TRAUMA: 8, PEDIATRIC: 4, OBSTETRIC: 3, GENERAL: 12 },
    isActive: true,
    acceptsInsurance: ['TPA-001', 'TPA-002'],
  },
]

const mockTPAs: InsuranceTPA[] = [
  { id: 'tpa-001', name: 'National Health TPA', code: 'NHT-001', isActive: true, networkHospitals: ['Central General Hospital'], cashlessTiers: { Tier1: ['Central General Hospital'], Tier2: ['City Clinic'] } },
  { id: 'tpa-002', name: 'Metro Insurance', code: 'MET-002', isActive: false, networkHospitals: ['City Clinic'], cashlessTiers: {} },
]

const mockSessions: EmergencySession[] = [
  {
    id: 'sess-001',
    patientId: 'pt-001',
    status: 'active',
    priority: 'critical',
    originLat: 19.07,
    originLng: 72.87,
    destinationHospitalId: 'demo-1',
    created_at: new Date().toISOString(),
  },
  {
    id: 'sess-002',
    patientId: 'pt-002',
    status: 'en_route',
    priority: 'urgent',
    originLat: 19.06,
    originLng: 72.86,
    destinationHospitalId: 'demo-1',
    created_at: new Date(Date.now() - 300000).toISOString(),
  },
]

export default function CommandCenter() {
  const firstHospital = mockHospitals[0]!
  const dynamicCenter: [number, number] = mockHospitals.length > 0
    ? [firstHospital.latitude, firstHospital.longitude]
    : [19.076, 72.8777]
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">ER Command Center</h1>

      <Card>
        <CardHeader><CardTitle>Live Hospital Map</CardTitle></CardHeader>
        <CardContent>
          <MapView
            hospitals={mockHospitals}
            center={dynamicCenter}
            zoom={mockHospitals.length > 0 ? 13 : 12}
            height="h-[400px]"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Insurance Coverage Matrix</CardTitle></CardHeader>
        <CardContent>
          <InsuranceMatrix tpas={mockTPAs} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Triage Queue</CardTitle></CardHeader>
        <CardContent>
          <TriageQueue sessions={mockSessions} />
        </CardContent>
      </Card>
    </div>
  )
}

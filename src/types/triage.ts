export interface TriageSession {
  id: string
  patientId: string
  status: 'pending' | 'active' | 'completed' | 'cancelled'
}

export interface EmergencySession {
  id?: string
  patientId: string
  sessionToken?: string
  status: 'active' | 'en_route' | 'arrived' | 'completed' | 'cancelled'
  originLat: number
  originLng: number
  destinationHospitalId?: string
  routeGeometry?: Record<string, unknown>
  estimatedArrival?: string
  priority: 'standard' | 'urgent' | 'critical'
  created_at?: string
  expires_at?: string
}

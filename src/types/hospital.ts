export interface Hospital {
  id: string
  name: string
  latitude: number
  longitude: number
  address?: string
  phone?: string
  specializations: string[]
  capacity: Record<string, number>
  isActive: boolean
  acceptsInsurance?: string[]
  created_at?: string
}

export interface InsuranceTPA {
  id: string
  name: string
  code: string
  networkHospitals?: string[]
  cashlessTiers?: Record<string, string[]>
  isActive: boolean
}

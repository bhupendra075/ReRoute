export interface InsuranceTPA {
  id: string
  name: string
  code: string
  networkHospitals?: string[]
  cashlessTiers?: Record<string, string[]>
  isActive: boolean
}

export async function fetchTPAs(): Promise<InsuranceTPA[]> {
  // Placeholder: production should use await supabase.from('tpas').select('*')
  return []
}

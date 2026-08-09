export interface QRPayload {
  patientId: string
  timestamp: number
  nonce: string
  kid: string
  bloodType?: string
  allergies?: string[]
  emergencyContacts?: Array<{ name: string; phone: string; relationship: string }>
  conditions?: string[]
  medications?: string[]
}

export interface SignedQR {
  payload: QRPayload
  signature: string
}

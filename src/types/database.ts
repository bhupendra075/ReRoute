// Supabase generated types — placeholder until `npm run db:types` generates the real file
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          auth_id: string
          email: string
          full_name: string | null
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          auth_id: string
          email: string
          full_name?: string | null
          role?: string
        }
        Update: {
          full_name?: string | null
          role?: string
        }
      }
      health_profiles: {
        Row: {
          id: string
          user_id: string
          encrypted_phi: string
          encrypted_emergency_contacts: string
          encrypted_insurance: string | null
          version: number
          updated_at: string
        }
      }
      hospitals: {
        Row: {
          id: string
          name: string
          latitude: number
          longitude: number
          address: string | null
          phone: string | null
          specializations: string[]
          capacity: Record<string, number>
          is_active: boolean
          accepts_insurance: string[] | null
          created_at: string
        }
      }
      emergency_sessions: {
        Row: {
          id: string
          patient_id: string
          session_token: string
          status: string
          origin_lat: number
          origin_lng: number
          destination_hospital_id: string | null
          route_geometry: Json | null
          estimated_arrival: string | null
          priority: string
          created_at: string
          expires_at: string
        }
      }
      qr_logs: {
        Row: {
          id: string
          patient_id: string
          nonce: string
          payload_hash: string
          signature: string
          scanned_at: string | null
          scanner_role: string | null
          created_at: string
        }
      }
      public_keys: {
        Row: {
          id: string
          kid: string
          public_key_pem: string
          algorithm: string
          is_active: boolean
          created_at: string
          expires_at: string | null
        }
      }
    }
  }
}

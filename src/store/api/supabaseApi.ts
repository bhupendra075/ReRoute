import { createApi } from '@reduxjs/toolkit/query/react'
import { supabase } from '@/lib/supabaseClient'
import type { Hospital, EmergencySession, User } from '@/types'

// Minimal baseQuery — overridden by queryFn on every endpoint
const baseQuery = async () => ({ data: undefined })

export const supabaseApi = createApi({
  reducerPath: 'supabaseApi',
  baseQuery,
  endpoints: (builder) => ({
    // ── Hospitals ──────────────────────────────────────────────
    getHospitals: builder.query<Hospital[], void>({
      queryFn: async () => {
        const { data, error } = await supabase
          .from('hospitals')
          .select('*')
          .eq('is_active', true)
          .order('name')

        if (error) return { error }
        return { data: (data ?? []) as Hospital[] }
      },
    }),

    getHospitalById: builder.query<Hospital, string>({
      queryFn: async (hospitalId) => {
        const { data, error } = await supabase
          .from('hospitals')
          .select('*')
          .eq('id', hospitalId)
          .single()

        if (error) return { error }
        return { data: data as Hospital }
      },
    }),

    // ── Emergency Sessions ─────────────────────────────────────
    getEmergencySessions: builder.query<EmergencySession[], string>({
      queryFn: async (patientId) => {
        const { data, error } = await supabase
          .from('emergency_sessions')
          .select('*')
          .eq('patient_id', patientId)
          .order('created_at', { ascending: false })

        if (error) return { error }
        return { data: (data ?? []) as EmergencySession[] }
      },
    }),

    getActiveSession: builder.query<EmergencySession | null, string>({
      queryFn: async (patientId) => {
        const { data, error } = await supabase
          .from('emergency_sessions')
          .select('*')
          .eq('patient_id', patientId)
          .eq('status', 'active')
          .single()

        if (error) return { error }
        return { data: (data ?? null) as EmergencySession | null }
      },
    }),

    createEmergencySession: builder.mutation<EmergencySession, Omit<EmergencySession, 'id' | 'sessionToken' | 'createdAt'>>({
      queryFn: async (session) => {
        const { data, error } = await supabase
          .from('emergency_sessions')
          .insert({
            patient_id: session.patientId,
            origin_lat: session.originLat,
            origin_lng: session.originLng,
            priority: session.priority,
            destination_hospital_id: session.destinationHospitalId ?? null,
          })
          .select()
          .single()

        if (error) return { error }
        return { data: data as EmergencySession }
      },
    }),

    updateEmergencySession: builder.mutation<
      EmergencySession,
      Partial<EmergencySession> & { id: string }
    >({
      queryFn: async ({ id, ...updates }) => {
        const columnMap: Record<string, string> = {
          patientId: 'patient_id',
          originLat: 'origin_lat',
          originLng: 'origin_lng',
          destinationHospitalId: 'destination_hospital_id',
          sessionToken: 'session_token',
          estimatedArrival: 'estimated_arrival',
          routeGeometry: 'route_geometry',
        }
        const dbUpdates = Object.fromEntries(
          Object.entries(updates).map(([key, value]) => [
            columnMap[key] ?? key,
            value,
          ]),
        )
        const { data, error } = await supabase
          .from('emergency_sessions')
          .update(dbUpdates)
          .eq('id', id)
          .select()
          .single()

        if (error) return { error }
        return { data: data as EmergencySession }
      },
    }),

    // ── Health Profiles ────────────────────────────────────────
    getHealthProfile: builder.query<
      { encrypted_phi: string; encrypted_emergency_contacts: string; encrypted_insurance: string | null; version: number } | null,
      string
    >({
      queryFn: async (userId) => {
        const { data, error } = await supabase
          .from('health_profiles')
          .select('*')
          .eq('user_id', userId)
          .single()

        if (error) return { error }
        return { data: data ?? null }
      },
    }),

    upsertHealthProfile: builder.mutation<
      { encrypted_phi: string; encrypted_emergency_contacts: string; encrypted_insurance: string | null; version: number },
      { user_id: string; encrypted_phi: string; encrypted_emergency_contacts: string; encrypted_insurance?: string }
    >({
      queryFn: async (profile) => {
        const { data, error } = await supabase
          .from('health_profiles')
          .upsert({
            user_id: profile.user_id,
            encrypted_phi: profile.encrypted_phi,
            encrypted_emergency_contacts: profile.encrypted_emergency_contacts,
            encrypted_insurance: profile.encrypted_insurance ?? null,
          })
          .select()
          .single()

        if (error) return { error }
        return { data: data as { encrypted_phi: string; encrypted_emergency_contacts: string; encrypted_insurance: string | null; version: number } }
      },
    }),

    // ── QR Logs ────────────────────────────────────────────────
    getQrLogs: builder.query<
      { id: string; patient_id: string; nonce: string; payload_hash: string; scanned_at: string | null; scanner_role: string | null }[],
      string
    >({
      queryFn: async (patientId) => {
        const { data, error } = await supabase
          .from('qr_logs')
          .select('*')
          .eq('patient_id', patientId)
          .order('created_at', { ascending: false })

        if (error) return { error }
        return { data: (data ?? []) as { id: string; patient_id: string; nonce: string; payload_hash: string; scanned_at: string | null; scanner_role: string | null }[] }
      },
    }),

    createQrLog: builder.mutation<
      { id: string; patient_id: string; nonce: string; payload_hash: string; signature: string; scanner_role: string | null },
      { patient_id: string; nonce: string; payload_hash: string; signature: string; scanner_role?: string }
    >({
      queryFn: async (log) => {
        const { data, error } = await supabase
          .from('qr_logs')
          .insert({
            patient_id: log.patient_id,
            nonce: log.nonce,
            payload_hash: log.payload_hash,
            signature: log.signature,
            scanner_role: log.scanner_role ?? null,
          })
          .select()
          .single()

        if (error) return { error }
        return { data: data as { id: string; patient_id: string; nonce: string; payload_hash: string; signature: string; scanner_role: string | null } }
      },
    }),

    // ── Public Keys ────────────────────────────────────────────
    getPublicKeys: builder.query<
      { id: string; kid: string; public_key_pem: string; algorithm: string; is_active: boolean }[],
      void
    >({
      queryFn: async () => {
        const { data, error } = await supabase
          .from('public_keys')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })

        if (error) return { error }
        return { data: (data ?? []) as { id: string; kid: string; public_key_pem: string; algorithm: string; is_active: boolean }[] }
      },
    }),

    // ── Users ──────────────────────────────────────────────────
    getUsers: builder.query<User[], void>({
      queryFn: async () => {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) return { error }
        return { data: (data ?? []) as User[] }
      },
    }),
  }),
})

export const {
  useGetHospitalsQuery,
  useGetHospitalByIdQuery,
  useGetEmergencySessionsQuery,
  useGetActiveSessionQuery,
  useCreateEmergencySessionMutation,
  useUpdateEmergencySessionMutation,
  useGetHealthProfileQuery,
  useUpsertHealthProfileMutation,
  useGetQrLogsQuery,
  useCreateQrLogMutation,
  useGetPublicKeysQuery,
  useGetUsersQuery,
} = supabaseApi

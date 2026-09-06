import { createApi } from '@reduxjs/toolkit/query/react'
import { supabase } from '@/lib/supabaseClient'

// Minimal baseQuery — overridden by queryFn on every endpoint
const baseQuery = async () => ({ data: undefined })

export const supabaseApi = createApi({
  reducerPath: 'supabaseApi',
  baseQuery,
  endpoints: (builder) => ({
    // ── Hospitals ──────────────────────────────────────────────
    getHospitals: builder.query({
      queryFn: async () => {
        const { data, error } = await supabase
          .from('hospitals')
          .select('*')
          .eq('is_active', true)
          .order('name')

        if (error) return { error }
        return { data: data ?? [] }
      },
    }),

    getHospitalById: builder.query({
      queryFn: async (hospitalId) => {
        const { data, error } = await supabase
          .from('hospitals')
          .select('*')
          .eq('id', hospitalId)
          .single()

        if (error) return { error }
        return { data: data ?? null }
      },
    }),

    // ── Emergency Sessions ─────────────────────────────────────
    getEmergencySessions: builder.query({
      queryFn: async (patientId) => {
        const { data, error } = await supabase
          .from('emergency_sessions')
          .select('*')
          .eq('patient_id', patientId)
          .order('created_at', { ascending: false })

        if (error) return { error }
        return { data: data ?? [] }
      },
    }),

    getActiveSession: builder.query({
      queryFn: async (patientId) => {
        const { data, error } = await supabase
          .from('emergency_sessions')
          .select('*')
          .eq('patient_id', patientId)
          .eq('status', 'active')
          .single()

        if (error) return { error }
        return { data: data ?? null }
      },
    }),

    createEmergencySession: builder.mutation({
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
        return { data }
      },
    }),

    updateEmergencySession: builder.mutation({
      queryFn: async ({ id, ...updates }) => {
        const columnMap = {
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
        return { data }
      },
    }),

    // ── Health Profiles ────────────────────────────────────────
    getHealthProfile: builder.query({
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

    upsertHealthProfile: builder.mutation({
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
        return { data }
      },
    }),

    // ── QR Logs ────────────────────────────────────────────────
    getQrLogs: builder.query({
      queryFn: async (patientId) => {
        const { data, error } = await supabase
          .from('qr_logs')
          .select('*')
          .eq('patient_id', patientId)
          .order('created_at', { ascending: false })

        if (error) return { error }
        return { data: data ?? [] }
      },
    }),

    createQrLog: builder.mutation({
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
        return { data }
      },
    }),

    // ── Public Keys ────────────────────────────────────────────
    getPublicKeys: builder.query({
      queryFn: async () => {
        const { data, error } = await supabase
          .from('public_keys')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })

        if (error) return { error }
        return { data: data ?? [] }
      },
    }),

    // ── Users ──────────────────────────────────────────────────
    getUsers: builder.query({
      queryFn: async () => {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) return { error }
        return { data: data ?? [] }
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
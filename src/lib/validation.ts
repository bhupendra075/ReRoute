import { z } from 'zod'

export const QRPayloadSchema = z.object({
  patientId: z.string().uuid(),
  timestamp: z.number().int().positive(),
  nonce: z.string().length(16),
  kid: z.string(),
  bloodType: z.string().optional(),
  allergies: z.array(z.string()).optional(),
  emergencyContacts: z
    .array(
      z.object({
        name: z.string(),
        phone: z.string(),
        relationship: z.string(),
      }),
    )
    .optional(),
  conditions: z.array(z.string()).optional(),
  medications: z.array(z.string()).optional(),
})

export const SignedQRSchema = z.object({
  payload: QRPayloadSchema,
  signature: z.string().min(1),
})

export const HospitalSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  address: z.string().optional(),
  phone: z.string().optional(),
  specializations: z.array(z.string()),
  capacity: z.record(z.string(), z.number()),
  isActive: z.boolean(),
  acceptsInsurance: z.array(z.string()).optional(),
})

export const EmergencySessionSchema = z.object({
  id: z.string().uuid().optional(),
  patientId: z.string().uuid(),
  status: z.enum(['active', 'en_route', 'arrived', 'completed', 'cancelled']),
  originLat: z.number().min(-90).max(90),
  originLng: z.number().min(-180).max(180),
  destinationHospitalId: z.string().uuid().optional(),
  priority: z.enum(['standard', 'urgent', 'critical']),
})

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  fullName: z.string().optional(),
  role: z.enum(['patient', 'paramedic', 'dispatcher', 'er_staff', 'admin']),
})

export type QRPayload = z.infer<typeof QRPayloadSchema>
export type SignedQR = z.infer<typeof SignedQRSchema>
export type Hospital = z.infer<typeof HospitalSchema>
export type EmergencySession = z.infer<typeof EmergencySessionSchema>
export type User = z.infer<typeof UserSchema>

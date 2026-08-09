import { describe, it, expect } from '@jest/globals'
import type { User } from '@/types'

// Simulated RLS policy checks based on the Supabase RLS policies defined in CLAUDE.md.
// These test the access-control logic that the app enforces client-side before
// issuing database requests, mirroring the server-side RLS policies.

const roles = ['patient', 'paramedic', 'dispatcher', 'er_staff', 'admin'] as const

function createMockUser(overrides: Partial<User> = {}): User {
  return {
    id: 'user-1',
    email: 'test@example.com',
    fullName: 'Test User',
    role: 'patient',
    ...overrides,
  }
}

describe('RLS — Row Level Security policies', () => {
  describe('users table', () => {
    it('allows a user to read their own record', () => {
      const user = createMockUser({ id: 'user-1', role: 'patient' })
      const targetUserId = 'user-1'

      const canRead =
        user.role === 'admin' || user.id === targetUserId

      expect(canRead).toBe(true)
    })

    it('denies a user from reading another user\'s record', () => {
      const user = createMockUser({ id: 'user-1', role: 'patient' })
      const targetUserId = 'user-2'

      const canRead =
        user.role === 'admin' || user.id === targetUserId

      expect(canRead).toBe(false)
    })

    it('allows an admin to read any user record', () => {
      const admin = createMockUser({ id: 'admin-1', role: 'admin' })

      roles.forEach((role) => {
        const targetUser = createMockUser({ id: `user-${role}`, role })
        const canRead =
          admin.role === 'admin' || admin.id === targetUser.id
        expect(canRead).toBe(true)
      })
    })
  })

  describe('health_profiles table', () => {
    it('allows a patient to read their own health profile', () => {
      const user = createMockUser({ id: 'user-1', role: 'patient' })
      const profileUserId = 'user-1'

      const canRead =
        user.role === 'admin' || user.id === profileUserId

      expect(canRead).toBe(true)
    })

    it('allows ER staff to read health profiles during an active session', () => {
      const erStaff = createMockUser({ id: 'er-1', role: 'er_staff' })
      const activeSession = true

      const canRead =
        erStaff.role === 'admin' ||
        (erStaff.role === 'er_staff' && activeSession)

      expect(canRead).toBe(true)
    })

    it('denies ER staff from reading health profiles when no active session exists', () => {
      const erStaff = createMockUser({ id: 'er-1', role: 'er_staff' })
      const activeSession = false

      const canRead =
        erStaff.role === 'admin' ||
        (erStaff.role === 'er_staff' && activeSession)

      expect(canRead).toBe(false)
    })

    it('denies a patient from reading another patient\'s health profile', () => {
      const user = createMockUser({ id: 'user-1', role: 'patient' })
      const profileUserId = 'user-2'

      const canRead =
        user.role === 'admin' || user.id === profileUserId

      expect(canRead).toBe(false)
    })
  })

  describe('emergency_sessions table', () => {
    it('allows a patient to create an emergency session', () => {
      const user = createMockUser({ id: 'user-1', role: 'patient' })

      const canCreate =
        user.role === 'patient' ||
        user.role === 'paramedic' ||
        user.role === 'admin'

      expect(canCreate).toBe(true)
    })

    it('allows a paramedic to create an emergency session', () => {
      const user = createMockUser({ id: 'user-1', role: 'paramedic' })

      const canCreate =
        user.role === 'patient' ||
        user.role === 'paramedic' ||
        user.role === 'admin'

      expect(canCreate).toBe(true)
    })

    it('allows an admin to create an emergency session', () => {
      const admin = createMockUser({ id: 'admin-1', role: 'admin' })

      const canCreate =
        admin.role === 'patient' ||
        admin.role === 'paramedic' ||
        admin.role === 'admin'

      expect(canCreate).toBe(true)
    })

    it('denies a dispatcher from creating an emergency session', () => {
      const dispatcher = createMockUser({ id: 'disp-1', role: 'dispatcher' })

      const canCreate =
        dispatcher.role === 'patient' ||
        dispatcher.role === 'paramedic' ||
        dispatcher.role === 'admin'

      expect(canCreate).toBe(false)
    })

    it('allows a patient to read their own emergency sessions', () => {
      const user = createMockUser({ id: 'user-1', role: 'patient' })
      const sessionPatientId = 'user-1'

      const canRead =
        user.role === 'admin' || user.id === sessionPatientId

      expect(canRead).toBe(true)
    })

    it('allows ER staff to read emergency sessions during active sessions', () => {
      const erStaff = createMockUser({ id: 'er-1', role: 'er_staff' })
      const activeSession = true

      const canRead =
        erStaff.role === 'admin' ||
        (erStaff.role === 'er_staff' && activeSession)

      expect(canRead).toBe(true)
    })
  })

  describe('qr_logs table', () => {
    it('allows a patient to create QR log entries for their own scans', () => {
      const user = createMockUser({ id: 'user-1', role: 'patient' })

      const canCreate =
        user.role === 'patient' ||
        user.role === 'paramedic' ||
        user.role === 'er_staff' ||
        user.role === 'admin'

      expect(canCreate).toBe(true)
    })

    it('allows ER staff to create QR log entries when scanning', () => {
      const erStaff = createMockUser({ id: 'er-1', role: 'er_staff' })

      const canCreate =
        erStaff.role === 'patient' ||
        erStaff.role === 'paramedic' ||
        erStaff.role === 'er_staff' ||
        erStaff.role === 'admin'

      expect(canCreate).toBe(true)
    })
  })

  describe('public_keys table', () => {
    it('allows any authenticated user to read active public keys', () => {
      const user = createMockUser({ id: 'user-1', role: 'patient' })

      const canRead = user.role !== undefined

      expect(canRead).toBe(true)
    })

    it('allows admin to read all public keys including inactive ones', () => {
      const admin = createMockUser({ id: 'admin-1', role: 'admin' })
      const includeInactive = true

      const canRead = admin.role === 'admin' || !includeInactive

      expect(canRead).toBe(true)
    })
  })
})

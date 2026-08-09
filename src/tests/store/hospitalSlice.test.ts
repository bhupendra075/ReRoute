import { describe, it, expect } from '@jest/globals'
import hospitalReducer, {
  setHospitals,
  setSelectedHospital,
  updateHospitalCapacity,
  setLoading,
  setError,
  clearError,
} from '@/store/hospitalSlice'
import type { Hospital } from '@/types'

const mockHospitals: Hospital[] = [
  {
    id: 'hosp-1',
    name: 'Central Hospital',
    latitude: 40.7128,
    longitude: -74.006,
    specializations: ['ICU', 'CARDIAC'],
    capacity: { icu: 10, general: 50 },
    isActive: true,
  },
  {
    id: 'hosp-2',
    name: 'City Medical',
    latitude: 40.758,
    longitude: -73.9855,
    specializations: ['STROKE', 'TRAUMA'],
    capacity: { icu: 5, general: 30 },
    isActive: true,
  },
]

const mockHospital: Hospital = mockHospitals[0]!

describe('hospitalSlice', () => {
  it('returns initial state', () => {
    const state = hospitalReducer(undefined, { type: 'unknown' })
    expect(state.hospitals).toEqual([])
    expect(state.selectedHospital).toBeNull()
    expect(state.loading).toBe(false)
    expect(state.error).toBeNull()
  })

  describe('setHospitals', () => {
    it('sets the hospitals list', () => {
      const state = hospitalReducer(undefined, setHospitals(mockHospitals))
      expect(state.hospitals).toHaveLength(2)
      expect(state.hospitals[0]!.name).toBe('Central Hospital')
    })

    it('replaces existing hospitals', () => {
      const withHospitals = hospitalReducer(undefined, setHospitals(mockHospitals))
      const newHospitals = [mockHospitals[1]!]
      const state = hospitalReducer(withHospitals, setHospitals(newHospitals))
      expect(state.hospitals).toHaveLength(1)
      expect(state.hospitals[0]!.id).toBe('hosp-2')
    })
  })

  describe('setSelectedHospital', () => {
    it('sets the selected hospital', () => {
      const state = hospitalReducer(undefined, setSelectedHospital(mockHospital))
      expect(state.selectedHospital).toEqual(mockHospital)
    })

    it('clears the selected hospital when null', () => {
      const withHospital = hospitalReducer(undefined, setSelectedHospital(mockHospital))
      const state = hospitalReducer(withHospital, setSelectedHospital(null))
      expect(state.selectedHospital).toBeNull()
    })
  })

  describe('updateHospitalCapacity', () => {
    it('updates capacity for a matching hospital', () => {
      const withHospitals = hospitalReducer(undefined, setHospitals(mockHospitals))
      const state = hospitalReducer(
        withHospitals,
        updateHospitalCapacity({ hospitalId: 'hosp-1', capacity: { icu: 15, general: 60 } }),
      )
      expect(state.hospitals[0]!.capacity).toEqual({ icu: 15, general: 60 })
      expect(state.hospitals[1]!.capacity).toEqual({ icu: 5, general: 30 })
    })

    it('does not affect hospitals that do not match', () => {
      const withHospitals = hospitalReducer(undefined, setHospitals(mockHospitals))
      const state = hospitalReducer(
        withHospitals,
        updateHospitalCapacity({ hospitalId: 'hosp-999', capacity: { icu: 99 } }),
      )
      expect(state.hospitals).toEqual(mockHospitals)
    })
  })

  describe('loading and error', () => {
    it('sets loading state', () => {
      const state = hospitalReducer(undefined, setLoading(true))
      expect(state.loading).toBe(true)
    })

    it('sets error state', () => {
      const state = hospitalReducer(undefined, setError('Fetch failed'))
      expect(state.error).toBe('Fetch failed')
    })

    it('clears error', () => {
      const withError = hospitalReducer(undefined, setError('Error'))
      const state = hospitalReducer(withError, clearError())
      expect(state.error).toBeNull()
    })
  })
})

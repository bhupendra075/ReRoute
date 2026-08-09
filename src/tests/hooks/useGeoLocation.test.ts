import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import { renderHook, act } from '@testing-library/react'
import { useGeoLocation } from '@/hooks/useGeoLocation'

// Mock navigator.geolocation
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
}

Object.defineProperty(navigator, 'geolocation', {
  value: mockGeolocation,
  writable: true,
})

describe('useGeoLocation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns initial state', () => {
    const { result } = renderHook(() => useGeoLocation())
    expect(result.current.isLoading).toBe(false)
    expect(result.current.latitude).toBeNull()
    expect(result.current.longitude).toBeNull()
  })

  it('updates state on getCurrentPosition success', async () => {
    mockGeolocation.getCurrentPosition.mockImplementation(
      (success: any) => {
        success({ coords: { latitude: 40.7128, longitude: -74.006, accuracy: 10 } } as any)
      },
    )

    const { result } = renderHook(() => useGeoLocation())
    await act(async () => {
      result.current.getCurrentPosition()
    })

    expect(result.current.latitude).toBe(40.7128)
    expect(result.current.longitude).toBe(-74.006)
    expect(result.current.accuracy).toBe(10)
  })

  it('sets error when geolocation is unsupported', () => {
    Object.defineProperty(navigator, 'geolocation', {
      value: undefined,
      writable: true,
    })

    const { result } = renderHook(() => useGeoLocation())
    result.current.getCurrentPosition()

    expect(result.current.error).toBe('Geolocation is not supported by this browser')
  })
})

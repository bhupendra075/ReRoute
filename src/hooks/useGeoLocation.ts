import { useState, useEffect, useCallback, useRef } from 'react'
import { flushSync } from 'react-dom'

interface GeoLocationState {
  latitude: number | null
  longitude: number | null
  accuracy: number | null
  error: string | null
  isLoading: boolean
}

export function useGeoLocation() {
  const [state, setState] = useState<GeoLocationState>({
    latitude: null,
    longitude: null,
    accuracy: null,
    error: null,
    isLoading: false,
  })
  const watchId = useRef<number | null>(null)

  const getCurrentPosition = useCallback(() => {
    if (!navigator.geolocation) {
      flushSync(() => setState((prev) => ({ ...prev, error: 'Geolocation is not supported by this browser' })))
      return
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          error: null,
          isLoading: false,
        })
      },
      (error) => {
        setState({
          latitude: null,
          longitude: null,
          accuracy: null,
          error: error.message,
          isLoading: false,
        })
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    )
  }, [])

  const startWatching = useCallback(() => {
    if (!navigator.geolocation) {
      flushSync(() => setState((prev) => ({ ...prev, error: 'Geolocation is not supported by this browser' })))
      return
    }

    if (watchId.current !== null) return

    setState((prev) => ({ ...prev, isLoading: true }))

    watchId.current = navigator.geolocation.watchPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          error: null,
          isLoading: false,
        })
      },
      (error) => {
        setState((prev) => ({ ...prev, error: error.message, isLoading: false }))
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 },
    )
  }, [])

  const stopWatching = useCallback(() => {
    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current)
      watchId.current = null
    }
    setState((prev) => ({ ...prev, isLoading: false }))
  }, [])

  useEffect(() => {
    return () => {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current)
      }
    }
  }, [])

  return { ...state, getCurrentPosition, startWatching, stopWatching }
}

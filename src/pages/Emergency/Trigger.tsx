import { useState } from 'react'
import { useGeoLocation } from '@/hooks/useGeoLocation'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function Trigger() {
  const { latitude, longitude, isLoading, getCurrentPosition } = useGeoLocation()
  const [triggered, setTriggered] = useState(false)

  const handleTrigger = async () => {
    getCurrentPosition()
    setTriggered(true)
    // In production: create emergency session via Supabase
  }

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4">
      {!triggered ? (
        <Card className="w-full max-w-sm text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Emergency Trigger</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Tap the button below to activate emergency mode. Your location and medical profile will be shared with nearby ER staff.
            </p>
            <Button onClick={handleTrigger} variant="danger" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? <LoadingSpinner size="sm" /> : '🚨 Activate Emergency'}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-sm text-center">
          <CardHeader>
            <CardTitle className="text-2xl text-red-600">Emergency Activated</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-gray-600">
              Your emergency session is active. ER staff can scan your QR code to access your medical profile and route you to the nearest equipped hospital.
            </p>
            {latitude && longitude && (
              <p className="text-sm text-gray-500">
                Location: {latitude.toFixed(4)}, {longitude.toFixed(4)}
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

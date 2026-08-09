import type { EmergencySession } from '@/types'
import { TriageCard } from './TriageCard'

interface TriageQueueProps {
  sessions: EmergencySession[]
  onSessionClick?: (session: EmergencySession) => void
}

export function TriageQueue({ sessions, onSessionClick }: TriageQueueProps) {
  if (sessions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p className="text-lg">No active sessions</p>
        <p className="text-sm">Emergency sessions will appear here.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3" role="list" aria-label="Triage queue">
      {sessions.map((session) => (
        <TriageCard
          key={session.id}
          session={session}
          onClick={() => onSessionClick?.(session)}
        />
      ))}
    </div>
  )
}

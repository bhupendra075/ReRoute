import { TriageCard } from './TriageCard'

export function TriageQueue({ sessions, recommendedHospitals, onSessionClick }) {
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
          recommendedHospitals={recommendedHospitals?.[session.id ?? '']}
          onClick={() => onSessionClick?.(session)}
        />
      ))}
    </div>
  )
}
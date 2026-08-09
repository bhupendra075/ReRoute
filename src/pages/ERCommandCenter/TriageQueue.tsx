import { TriageQueue } from '@/components/triage/TriageQueue'
import type { EmergencySession } from '@/types'

interface CommandTriageQueueProps {
  sessions: EmergencySession[]
}

export function CommandTriageQueue({ sessions }: CommandTriageQueueProps) {
  return <TriageQueue sessions={sessions} />
}

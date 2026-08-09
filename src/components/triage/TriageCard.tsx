import type { EmergencySession } from '@/types/triage'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { formatRelative } from '@/utils/formatters'
import { classNames } from '@/utils/helpers'

interface TriageCardProps {
  session: EmergencySession
  onClick?: () => void
}

const priorityStyles: Record<string, string> = {
  standard: 'border-l-4 border-l-blue-500',
  urgent: 'border-l-4 border-l-yellow-500',
  critical: 'border-l-4 border-l-red-500',
}

export function TriageCard({ session, onClick }: TriageCardProps) {
  return (
    <Card
      className={classNames('cursor-pointer hover:shadow-md transition-shadow', priorityStyles[session.priority] ?? '')}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Session {session.id?.slice(0, 8)}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <dl className="space-y-1 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-500">Priority</dt>
            <dd className="font-medium capitalize">{session.priority}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Status</dt>
            <dd className="font-medium capitalize">{session.status.replace('_', ' ')}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Patient</dt>
            <dd className="font-medium">{session.patientId.slice(0, 8)}…</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Updated</dt>
            <dd className="text-gray-600">{formatRelative(session.created_at ?? new Date())}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}

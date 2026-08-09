import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

export default function Settings() {
  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <Card>
        <CardHeader><CardTitle>Preferences</CardTitle></CardHeader>
        <CardContent>
          <p className="text-gray-600">Settings panel — configure notification preferences, theme, and data sharing options.</p>
        </CardContent>
      </Card>
    </div>
  )
}

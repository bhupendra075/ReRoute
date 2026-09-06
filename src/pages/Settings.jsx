import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useState } from 'react'
import { useTheme } from '@/context/ThemeContext'

const initialSettings = [
  {
    key: 'notifications',
    label: 'Push Notifications',
    value: 'enabled',
    description: 'Receive push notifications for emergency alerts'
  },
  {
    key: 'theme',
    label: 'Theme',
    value: 'system',
    description: 'Light, dark, or system default'
  },
  {
    key: 'dataSharing',
    label: 'Data Sharing',
    value: 'opt-out',
    description: 'Share anonymous usage data'
  },
  {
    key: 'privacyMode',
    label: 'Privacy Mode',
    value: 'disabled',
    description: 'Hide your location from public view'
  },
]

export default function Settings() {
  const { theme, toggled } = useTheme()
  const [settings, setSettings] = useState(initialSettings)
  const [editing, setEditing] = useState(null)

  const handleSave = (key, value) => {
    setSettings(prev =>
      prev.map(setting =>
        setting.key === key ? { ...setting, value } : setting
      )
    )
    setEditing(null)
  }

  const handleDelete = (key) => {
    setSettings(prev => prev.filter(setting => setting.key !== key))
    setEditing(null)
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Active sessions</p>
          <p className="text-2xl font-bold">3</p>
        </div>
        <div className="p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Storage used</p>
          <p className="text-2xl font-bold">2.3 MB</p>
        </div>
      </div>

      {/* Settings form */}
      <Card variant={theme === 'dark' ? 'neumorphism' : 'bordered'}>
        <CardHeader><CardTitle>Preferences</CardTitle></CardHeader>
        <CardContent>
          {settings.map(setting => (
            <div key={setting.key} className="space-y-3">
              <label
                htmlFor={setting.key}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {setting.label}
                {setting.description && (
                  <span className="text-xs text-gray-500 ml-1 capitalize" title={setting.description}>
                    •
                  </span>
                )}
              </label>

              {editing === setting.key ? (
                <div className="flex items-center space-x-3">
                  <Input
                    id={setting.key}
                    value={setting.value}
                    onChange={(e) =>
                      setSettings(
                        prev =>
                          prev.map(s =>
                            s.key === setting.key ? { ...s, value: e.target.value } : s
                          )
                      )
                    }
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditing(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleSave(setting.key, setting.value)}
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">{setting.value}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditing(setting.key)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(setting.key)}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Theme toggle at bottom */}
      <div className="mt-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggled}
          className="w-full flex items-center justify-between"
        >
          Theme
          <svg
            className="h-4 w-4 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              className="stroke-2"
              d="M20.354 15.354A9 9 0 018.346 2.345a1.125 1.125 0 101.758 1.75l4.19 4.19a3 3 0 001.308 1.065l-1.66 1.66a9 9 0 015.604-3.088l1.5 1.5z"
            />
          </svg>
        </Button>
      </div>

      {/* Action button */}
      <div className="mt-8">
        <Button
          variant="outline"
          onClick={() =>
            setSettings(prev => [...prev, { key: `new-${Date.now()}`, label: 'New Setting', value: '', description: '' }])
          }
        >
          Add New Setting
        </Button>
      </div>
    </div>
  )
}
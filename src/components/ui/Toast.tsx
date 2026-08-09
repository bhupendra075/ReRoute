import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface ToastProps {
  type: 'info' | 'success' | 'warning' | 'error'
  message: string
  onDismiss?: () => void
}

const styles = {
  info: 'bg-blue-50 border-blue-200 text-blue-800',
  success: 'bg-green-50 border-green-200 text-green-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  error: 'bg-red-50 border-red-200 text-red-800',
}

const icons = {
  info: 'ℹ️',
  success: '✅',
  warning: '⚠️',
  error: '❌',
}

export function Toast({ type, message, onDismiss }: ToastProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex items-center gap-2 rounded-lg border px-4 py-3 text-sm shadow-sm',
        styles[type],
      )}
    >
      <span>{icons[type]}</span>
      <span className="flex-1">{message}</span>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="ml-2 text-gray-400 hover:text-gray-600"
          aria-label="Dismiss notification"
        >
          ✕
        </button>
      )}
    </div>
  )
}

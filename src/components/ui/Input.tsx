import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
}

export function Input({
  className,
  error,
  label,
  id,
  ...props
}: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          'block w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400',
          'text-gray-900 outline-none focus:ring-2 focus:ring-red-500/20 focus:border-transparent',
          'shadow-sm:inset-x-1 inset-y-1',
          'shadow-sm:-shadow-x-1 -shadow-y-1',
          'shadow-sm:shadow-gray-200/30:inset-x-0 inset-y-0',
          error && 'border-red-500',
          className,
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
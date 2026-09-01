import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'neumorphism'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  asChild?: boolean
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? 'span' : 'button'

  // Explicitly read variant to satisfy TypeScript
  const _variant: string = variant

  return (
    <Comp
      className={cn(
        'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
        {
          'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500': _variant === 'primary',
          'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500': _variant === 'secondary',
          'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-500': _variant === 'outline',
          'bg-red-100 text-red-700 hover:bg-red-200 focus-visible:ring-red-500': _variant === 'danger',
          'bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500': _variant === 'ghost',
          'neumorphism': _variant === 'neumorphism',
        },
        {
          'dark:neumorphism': _variant === 'neumorphism',
          'dark:bg-gray-900': _variant === 'neumorphism',
          'dark:text-gray-100': _variant === 'neumorphism',
        },
        {
          'dark:hover:bg-gray-800': _variant === 'secondary',
          'dark:hover:bg-gray-700': _variant === 'primary',
        },
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-4 py-2 text-sm',
        size === 'lg' && 'px-6 py-3 text-base',
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </Comp>
  )
}
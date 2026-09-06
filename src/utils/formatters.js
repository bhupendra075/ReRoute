import { format, formatDistanceToNow } from 'date-fns'

export function formatDate(date, pattern = 'MMM d, yyyy') {
  return format(new Date(date), pattern)
}

export function formatDateTime(date) {
  return format(new Date(date), 'MMM d, yyyy h:mm a')
}

export function formatRelative(date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
}

export function truncate(str, maxLength = 100) {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trimEnd() + '…'
}
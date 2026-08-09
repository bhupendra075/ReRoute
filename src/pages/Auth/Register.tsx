import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function Register() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await signUp(email, password, fullName)
      navigate('/auth/setup')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4" noValidate>
        <h1 className="text-2xl font-bold text-center">Create Account</h1>
        {error && <p className="text-sm text-red-600 text-center" role="alert">{error}</p>}
        <Input label="Full Name" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        <Input label="Email" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
        <Input label="Password" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="new-password" />
        <Button type="submit" variant="primary" className="w-full" loading={loading}>
          Create Account
        </Button>
        <p className="text-center text-sm text-gray-600">
          Already have an account? <a href="/auth/login" className="text-red-600 hover:underline">Sign In</a>
        </p>
      </form>
    </div>
  )
}

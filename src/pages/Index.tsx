import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

export default function Index() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="text-center py-16">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          reroute — Emergency Triage
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Generate a signed emergency QR code containing your medical profile. ER staff can scan it to instantly access critical health data and route you to the best-equipped hospital.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild variant="primary" size="lg">
            <Link to="/emergency/trigger">Emergency Trigger</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/auth/login">Sign In</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

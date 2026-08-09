import { Outlet } from 'react-router-dom'
import Header from './Header'
import MobileDrawer from './MobileDrawer'

export default function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <MobileDrawer />
    </div>
  )
}

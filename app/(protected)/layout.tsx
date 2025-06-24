import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Sidebar from '@/app/components/ui/Sidebar'
import MobileHeader from '@/app/components/ui/MobileHeader'
import { Home, Settings, User } from 'lucide-react'

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    redirect('/auth/signin')
  }

  if (session.user?.role === 'admin') {
    redirect('/admin')
  }

  const menuItems = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: <Home className="w-4 h-4" />,
    },
    { href: '/profile', label: 'Profil', icon: <User className="w-4 h-4" /> },
    {
      href: '/settings',
      label: 'Ayarlar',
      icon: <Settings className="w-4 h-4" />,
    },
  ]

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      {/* Mobile Header Bar - Sticky */}
      <MobileHeader title="Dashboard" />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop: fixed width, Mobile: overlay (no space taken) */}
        <Sidebar session={session} title="Dashboard" menuItems={menuItems} />

        {/* Main Content - Responsive, full width on mobile */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}

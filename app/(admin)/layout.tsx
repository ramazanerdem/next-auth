import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Sidebar from '@/app/components/ui/Sidebar'
import MobileHeader from '@/app/components/ui/MobileHeader'
import { Home, Settings, Users, Shield } from 'lucide-react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session || session.user?.role !== 'admin') {
    redirect('/403')
  }

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: <Home className="w-4 h-4" /> },
    {
      href: '/admin/users',
      label: 'Kullanıcı Yönetimi',
      icon: <Users className="w-4 h-4" />,
    },
    {
      href: '/admin/settings',
      label: 'Sistem Ayarları',
      icon: <Settings className="w-4 h-4" />,
    },
    {
      href: '/admin/logs',
      label: 'Güvenlik Logları',
      icon: <Shield className="w-4 h-4" />,
    },
  ]

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      {/* Mobile Header Bar - Sticky */}
      <MobileHeader title="Admin Panel" />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop: fixed width, Mobile: overlay (no space taken) */}
        <Sidebar
          session={session}
          title="Admin Panel"
          subtitle="Admin Yetkisi"
          menuItems={menuItems}
        />

        {/* Main Content - Responsive, full width on mobile */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}

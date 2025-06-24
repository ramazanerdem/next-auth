'use client'

import type { Session } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { getProviderName } from '@/app/lib/functions/provider'

interface UserDashboardProps {
  session: Session
}

export default function UserDashboard({ session }: UserDashboardProps) {
  const recentActivities = [
    {
      id: 1,
      action: 'Sisteme giriş yaptınız',
      time: '5 dakika önce',
      type: 'login',
    },
    {
      id: 2,
      action: 'Profil bilgilerinizi görüntülediniz',
      time: '1 saat önce',
      type: 'view',
    },
    {
      id: 3,
      action: 'Hesap ayarları sayfasını ziyaret ettiniz',
      time: '3 saat önce',
      type: 'settings',
    },
  ]

  const quickActions = [
    {
      title: 'Profil Düzenle',
      description: 'Kişisel bilgilerinizi güncelleyin',
      href: '/profile',
      color: 'border-gray-200',
    },
    {
      title: 'Hesap Ayarları',
      description: 'Güvenlik ve tercih ayarları',
      href: '/settings',
      color: 'border-gray-200',
    },
    {
      title: 'Güvenlik',
      description: 'Şifre ve güvenlik seçenekleri',
      href: '/settings?tab=security',
      color: 'border-gray-200',
    },
  ]

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header - Fixed */}
      <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 md:py-6 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-lg md:text-xl font-semibold text-gray-900 truncate">
              Hoş geldin, {session.user?.name?.split(' ')[0]}
            </h1>
          </div>
          <div className="flex items-center space-x-4 flex-shrink-0 ml-4">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold">
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="rounded-full object-cover w-8 h-8 md:w-10 md:h-10"
                />
              ) : (
                <span className="text-sm md:text-base">
                  {session.user?.name?.charAt(0) || 'U'}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Content - Scrollable */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
          {/* Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
            {/* Quick Actions */}
            <div className="card">
              <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
                <h3 className="text-base md:text-lg font-semibold text-gray-900">
                  Hızlı İşlemler
                </h3>
              </div>
              <div className="p-4 md:p-6">
                <div className="space-y-3 md:space-y-4">
                  {quickActions.map((action, index) => (
                    <Link
                      key={index}
                      href={action.href}
                      className={`block p-3 md:p-4 border ${action.color} rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer`}
                    >
                      <h4 className="font-medium text-gray-900 mb-1 text-sm md:text-base">
                        {action.title}
                      </h4>
                      <p className="text-xs md:text-sm text-gray-600">
                        {action.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="card">
              <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
                <h3 className="text-base md:text-lg font-semibold text-gray-900">
                  Son Aktiviteler
                </h3>
              </div>
              <div className="p-4 md:p-6">
                <div className="space-y-3 md:space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3 p-2 md:p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs md:text-sm text-gray-900 break-words">
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Account Overview */}
          <div className="card">
            <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
              <h3 className="text-base md:text-lg font-semibold text-gray-900">
                Hesap Bilgileri
              </h3>
            </div>
            <div className="p-4 md:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="min-w-0">
                  <label className="text-xs md:text-sm font-medium text-gray-700">
                    Ad Soyad
                  </label>
                  <p className="mt-1 text-sm md:text-base text-gray-900 truncate">
                    {session.user?.name}
                  </p>
                </div>
                <div className="min-w-0">
                  <label className="text-xs md:text-sm font-medium text-gray-700">
                    E-posta
                  </label>
                  <p className="mt-1 text-sm md:text-base text-gray-900 truncate">
                    {session.user?.email}
                  </p>
                </div>
                <div className="min-w-0">
                  <label className="text-xs md:text-sm font-medium text-gray-700">
                    Rol
                  </label>
                  <p className="mt-1 text-sm md:text-base text-gray-900 capitalize">
                    {session.user?.role || 'User'}
                  </p>
                </div>
                <div className="min-w-0">
                  <label className="text-xs md:text-sm font-medium text-gray-700">
                    Giriş Yöntemi
                  </label>
                  <p className="mt-1 text-sm md:text-base text-gray-900 truncate">
                    {getProviderName(session)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

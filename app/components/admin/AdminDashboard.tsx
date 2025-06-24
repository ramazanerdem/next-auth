'use client'

import type { Session } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'

interface AdminDashboardProps {
  session: Session
}

export default function AdminDashboard({ session }: AdminDashboardProps) {
  const stats = [
    {
      title: 'Toplam Kullanıcı',
      value: '1,234',
      change: '+12%',
      changeType: 'increase',
    },
    {
      title: 'Aktif Oturumlar',
      value: '89',
      change: '+5%',
      changeType: 'increase',
    },
    {
      title: 'Bugünkü Giriş',
      value: '156',
      change: '+23%',
      changeType: 'increase',
    },
    {
      title: 'Güvenlik Uyarıları',
      value: '3',
      change: '-2',
      changeType: 'decrease',
    },
  ]

  const recentActivities = [
    {
      id: 1,
      user: 'john.doe@example.com',
      action: 'Giriş yaptı',
      time: '5 dakika önce',
      type: 'login',
    },
    {
      id: 2,
      user: 'jane.smith@example.com',
      action: 'Profil güncelledi',
      time: '15 dakika önce',
      type: 'update',
    },
    {
      id: 3,
      user: 'admin',
      action: 'Kullanıcı sildi',
      time: '1 saat önce',
      type: 'delete',
    },
    {
      id: 4,
      user: 'mike.wilson@example.com',
      action: 'Hesap oluşturdu',
      time: '2 saat önce',
      type: 'create',
    },
  ]

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header - Fixed */}
      <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 md:py-6 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-lg md:text-xl font-semibold text-gray-900">
              Admin Dashboard
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
                  {session.user?.name?.charAt(0) || 'A'}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Content - Scrollable */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="card p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs md:text-sm font-medium text-gray-600 truncate">
                      {stat.title}
                    </p>
                    <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1 md:mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 ml-3">
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-gray-900 rounded"></div>
                  </div>
                </div>
                <div className="mt-3 md:mt-4">
                  <span
                    className={`text-xs md:text-sm font-medium ${
                      stat.changeType === 'increase'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-xs md:text-sm text-gray-600 ml-1">
                    geçen haftaya göre
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
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
                          <span className="font-medium">{activity.user}</span>{' '}
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

            {/* Quick Actions */}
            <div className="card">
              <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
                <h3 className="text-base md:text-lg font-semibold text-gray-900">
                  Hızlı İşlemler
                </h3>
              </div>
              <div className="p-4 md:p-6">
                <div className="space-y-3 md:space-y-4">
                  <Link
                    href="/admin/users"
                    className="block p-3 md:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                  >
                    <h4 className="font-medium text-gray-900 mb-1 text-sm md:text-base">
                      Kullanıcı Yönetimi
                    </h4>
                    <p className="text-xs md:text-sm text-gray-600">
                      Kullanıcıları görüntüle ve yönet
                    </p>
                  </Link>
                  <Link
                    href="/admin/settings"
                    className="block p-3 md:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                  >
                    <h4 className="font-medium text-gray-900 mb-1 text-sm md:text-base">
                      Sistem Ayarları
                    </h4>
                    <p className="text-xs md:text-sm text-gray-600">
                      Sistem konfigürasyonunu düzenle
                    </p>
                  </Link>
                  <Link
                    href="/admin/logs"
                    className="block p-3 md:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                  >
                    <h4 className="font-medium text-gray-900 mb-1 text-sm md:text-base">
                      Güvenlik Logları
                    </h4>
                    <p className="text-xs md:text-sm text-gray-600">
                      Güvenlik olaylarını incele
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="card">
            <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
              <h3 className="text-base md:text-lg font-semibold text-gray-900">
                Sistem Durumu
              </h3>
            </div>
            <div className="p-4 md:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                <div className="text-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                  <p className="text-xs md:text-sm font-medium text-gray-900">
                    Auth Servisi
                  </p>
                  <p className="text-xs text-gray-600">Çalışıyor</p>
                </div>
                <div className="text-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                  <p className="text-xs md:text-sm font-medium text-gray-900">
                    Database
                  </p>
                  <p className="text-xs text-gray-600">Çalışıyor</p>
                </div>
                <div className="text-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-2"></div>
                  <p className="text-xs md:text-sm font-medium text-gray-900">
                    API
                  </p>
                  <p className="text-xs text-gray-600">Yavaş</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

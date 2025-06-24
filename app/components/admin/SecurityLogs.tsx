'use client'

import { useState } from 'react'

interface SecurityLog {
  id: string
  timestamp: string
  event: string
  user: string
  ip: string
  status: 'success' | 'warning' | 'error'
  details: string
}

export default function SecurityLogs() {
  const [logs] = useState<SecurityLog[]>([
    {
      id: '1',
      timestamp: '2024-01-15 14:30:15',
      event: 'Başarılı Giriş',
      user: 'john.doe@example.com',
      ip: '192.168.1.100',
      status: 'success',
      details: 'Google OAuth ile giriş yapıldı',
    },
    {
      id: '2',
      timestamp: '2024-01-15 14:25:42',
      event: 'Başarısız Giriş',
      user: 'unknown@example.com',
      ip: '192.168.1.150',
      status: 'error',
      details: 'Geçersiz kimlik bilgileri',
    },
    {
      id: '3',
      timestamp: '2024-01-15 14:20:30',
      event: 'Admin Panel Erişimi',
      user: 'admin@example.com',
      ip: '192.168.1.50',
      status: 'success',
      details: 'Admin paneline erişim sağlandı',
    },
    {
      id: '4',
      timestamp: '2024-01-15 14:15:18',
      event: 'Şüpheli Aktivite',
      user: 'test@example.com',
      ip: '10.0.0.50',
      status: 'warning',
      details: 'Çok sayıda başarısız giriş denemesi',
    },
    {
      id: '5',
      timestamp: '2024-01-15 14:10:05',
      event: 'Oturum Sonlandırıldı',
      user: 'jane.smith@example.com',
      ip: '192.168.1.200',
      status: 'success',
      details: 'Kullanıcı çıkış yaptı',
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800'
      case 'error':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success':
        return 'Başarılı'
      case 'warning':
        return 'Uyarı'
      case 'error':
        return 'Hata'
      default:
        return 'Bilinmiyor'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">
            Güvenlik Logları
          </h1>
        </div>
        <button className="btn-secondary">Dışa Aktar</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toplam Olay</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {logs.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-gray-900 rounded"></div>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Başarılı İşlem
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {logs.filter((log) => log.status === 'success').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Uyarılar</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {logs.filter((log) => log.status === 'warning').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Hatalar</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {logs.filter((log) => log.status === 'error').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-red-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="card">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Son Güvenlik Olayları
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Zaman
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Olay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kullanıcı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP Adresi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Detaylar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {log.event}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.ip}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        log.status
                      )}`}
                    >
                      {getStatusText(log.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

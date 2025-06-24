import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const mockLogs = [
  {
    id: '1',
    timestamp: '2024-01-15T10:30:00Z',
    level: 'info',
    event: 'user_login',
    user: 'john.doe@example.com',
    ip: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    details: 'Successful login via Google OAuth',
  },
  {
    id: '2',
    timestamp: '2024-01-15T10:25:00Z',
    level: 'warning',
    event: 'failed_login',
    user: 'unknown@example.com',
    ip: '192.168.1.200',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    details: 'Failed login attempt - invalid credentials',
  },
  {
    id: '3',
    timestamp: '2024-01-15T10:20:00Z',
    level: 'info',
    event: 'admin_login',
    user: 'admin@kayra.com',
    ip: '192.168.1.50',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    details: 'Admin login via credentials',
  },
  {
    id: '4',
    timestamp: '2024-01-15T09:45:00Z',
    level: 'error',
    event: 'security_violation',
    user: 'suspicious@example.com',
    ip: '10.0.0.1',
    userAgent: 'curl/7.68.0',
    details: 'Suspected bot activity - multiple rapid requests',
  },
  {
    id: '5',
    timestamp: '2024-01-15T09:30:00Z',
    level: 'info',
    event: 'user_logout',
    user: 'jane.smith@example.com',
    ip: '192.168.1.150',
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15',
    details: 'User logged out successfully',
  },
]

export default async function AdminLogsPage() {
  const session = await auth()

  if (!session || session.user?.role !== 'admin') {
    redirect('/403')
  }

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'error':
        return 'bg-red-100 text-red-800'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800'
      case 'info':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getEventColor = (event: string) => {
    switch (event) {
      case 'user_login':
      case 'admin_login':
        return 'bg-green-100 text-green-800'
      case 'failed_login':
        return 'bg-red-100 text-red-800'
      case 'security_violation':
        return 'bg-red-100 text-red-800'
      case 'user_logout':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              Güvenlik Logları
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="btn-secondary text-xs">Dışa Aktar</button>
            <button className="btn-secondary text-xs">Filtrele</button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="p-8 overflow-y-auto scrollbar-hidden">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Log</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {mockLogs.length}
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
                  Başarılı Giriş
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {
                    mockLogs.filter(
                      (log) =>
                        log.event.includes('login') && log.level === 'info'
                    ).length
                  }
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-green-500 rounded"></div>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Başarısız Giriş
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {
                    mockLogs.filter((log) => log.event === 'failed_login')
                      .length
                  }
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-red-500 rounded"></div>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Güvenlik Uyarısı
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {
                    mockLogs.filter(
                      (log) => log.level === 'error' || log.level === 'warning'
                    ).length
                  }
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-yellow-500 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Logs Table */}
        <div className="card">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-sm md:text-base font-semibold text-gray-900">
                Son Güvenlik Olayları
              </h3>
              <div className="flex items-center space-x-4">
                <select defaultValue="all" className="form-input text-xs w-32">
                  <option value="all">Tüm Seviyeler</option>
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                </select>
                <select defaultValue="all" className="form-input text-xs w-40">
                  <option value="all">Tüm Olaylar</option>
                  <option value="user_login">Kullanıcı Girişi</option>
                  <option value="failed_login">Başarısız Giriş</option>
                  <option value="admin_login">Admin Girişi</option>
                  <option value="security_violation">Güvenlik İhlali</option>
                </select>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Zaman
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Seviye
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
                    Detaylar
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(log.timestamp).toLocaleDateString('tr-TR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLogLevelColor(
                          log.level
                        )}`}
                      >
                        {log.level.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEventColor(
                          log.event
                        )}`}
                      >
                        {log.event.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                      {log.ip}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {log.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Log Details Modal would go here if needed */}
      </main>
    </>
  )
}

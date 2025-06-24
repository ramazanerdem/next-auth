import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2024-01-15T10:30:00Z',
    provider: 'Google',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2024-01-14T15:45:00Z',
    provider: 'GitHub',
  },
  {
    id: '3',
    name: 'Mike Wilson',
    email: 'mike.wilson@example.com',
    role: 'user',
    status: 'inactive',
    lastLogin: '2024-01-10T09:15:00Z',
    provider: 'Google',
  },
  {
    id: '4',
    name: 'Admin User',
    email: 'admin@kayra.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-15T12:00:00Z',
    provider: 'Credentials',
  },
]

const userStats = [
  {
    title: 'Toplam Kullanıcı',
    value: mockUsers.length,
    color: 'bg-blue-500/40',
    icon: '👤',
  },
  {
    title: 'Aktif Kullanıcı',
    value: mockUsers.filter((u) => u.status === 'active').length,
    color: 'bg-green-500/40',
    icon: '👤',
  },
  {
    title: 'Admin Kullanıcı',
    value: mockUsers.filter((u) => u.role === 'admin').length,
    color: 'bg-yellow-500/40',
    icon: '👤',
  },
  {
    title: 'Pasif Kullanıcı',
    value: mockUsers.filter((u) => u.status === 'inactive').length,
    color: 'bg-red-500/40',
    icon: '👤',
  },
]

export default async function AdminUsersPage() {
  const session = await auth()

  if (!session || session.user?.role !== 'admin') {
    redirect('/403')
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header - Fixed */}
      <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 md:py-6 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-lg md:text-xl font-semibold text-gray-900">
              Kullanıcı Yönetimi
            </h1>
          </div>
        </div>
      </header>

      {/* Content - Scrollable */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {userStats.map((stat) => (
              <div className="card p-4 md:p-6" key={stat.title}>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-start justify-center gap-1 min-w-0 flex-1">
                    <p className="text-xs md:text-sm font-medium text-gray-600 truncate">
                      {stat.title}
                    </p>
                    <p
                      className={`text-lg md:text-xl font-bold text-gray-900 px-3 md:px-4 rounded ${stat.color}`}
                    >
                      {stat.value}
                    </p>
                  </div>
                  <div className="text-xl md:text-2xl flex-shrink-0 ml-3">
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Users Table */}
          <div className="card">
            <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-base md:text-lg font-semibold text-gray-900">
                  Kullanıcı Listesi
                </h3>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <input
                    type="text"
                    placeholder="Kullanıcı ara..."
                    className="form-input w-full text-xs sm:w-64"
                  />
                  <select
                    defaultValue="all"
                    className="form-input w-full text-xs sm:w-32"
                  >
                    <option value="all">Tüm Roller</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="block md:hidden">
              {mockUsers.map((user) => (
                <div
                  key={user.id}
                  className="p-4 border-b border-gray-200 last:border-b-0"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {user.name}
                        </h4>
                        <div className="flex space-x-2 flex-shrink-0 ml-2">
                          <button className="text-xs text-gray-600 hover:text-gray-900 cursor-pointer">
                            Düzenle
                          </button>
                          <button className="text-xs text-red-600 hover:text-red-900 cursor-pointer">
                            Sil
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-2 truncate">
                        {user.email}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              user.role === 'admin'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {user.role === 'admin' ? 'Admin' : 'Kullanıcı'}
                          </span>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              user.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {user.status === 'active' ? 'Aktif' : 'Pasif'}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(user.lastLogin).toLocaleDateString('tr-TR')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kullanıcı
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rol
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Durum
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Giriş Yöntemi
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Son Giriş
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold">
                            {user.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.role === 'admin'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {user.role === 'admin' ? 'Admin' : 'Kullanıcı'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {user.status === 'active' ? 'Aktif' : 'Pasif'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.provider}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.lastLogin).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-gray-600 hover:text-gray-900 cursor-pointer">
                            Düzenle
                          </button>
                          <button className="text-red-600 hover:text-red-900 cursor-pointer">
                            Sil
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

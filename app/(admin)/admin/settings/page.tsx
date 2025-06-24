import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function AdminSettingsPage() {
  const session = await auth()

  if (!session || session.user?.role !== 'admin') {
    redirect('/403')
  }

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              Sistem Ayarları
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="p-8 overflow-y-auto scrollbar-hidden">
        <div className="grid gap-8">
          {/* Authentication Settings */}
          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Kimlik Doğrulama Ayarları
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">OAuth Provider (Google)</label>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Aktif</span>
                  </div>
                </div>

                <div>
                  <label className="form-label">OAuth Provider (GitHub)</label>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Aktif</span>
                  </div>
                </div>

                <div>
                  <label className="form-label">Admin Credentials</label>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Aktif</span>
                  </div>
                </div>

                <div>
                  <label className="form-label">JWT Token Süresi</label>
                  <select defaultValue="24h" className="form-input">
                    <option value="1h">1 Saat</option>
                    <option value="24h">24 Saat</option>
                    <option value="7d">7 Gün</option>
                    <option value="30d">30 Gün</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="btn-primary">Ayarları Kaydet</button>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Güvenlik Ayarları
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Başarısız Giriş Limiti</label>
                  <input
                    type="number"
                    defaultValue="5"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">
                    Hesap Kilitleme Süresi (dakika)
                  </label>
                  <input
                    type="number"
                    defaultValue="30"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Password Politikası</label>
                  <select defaultValue="medium" className="form-input">
                    <option value="basic">Temel (8+ karakter)</option>
                    <option value="medium">
                      Orta (8+ karakter, özel karakter)
                    </option>
                    <option value="strong">
                      Güçlü (12+ karakter, karışık)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="form-label">2FA Zorunluluğu</label>
                  <select defaultValue="disabled" className="form-input">
                    <option value="disabled">Devre Dışı</option>
                    <option value="optional">İsteğe Bağlı</option>
                    <option value="required">Zorunlu</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="btn-primary">
                  Güvenlik Ayarlarını Kaydet
                </button>
              </div>
            </div>
          </div>

          {/* System Configuration */}
          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Sistem Konfigürasyonu
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Uygulama Adı</label>
                  <input
                    type="text"
                    defaultValue="Kayra Auth Sistemi"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Destek E-postası</label>
                  <input
                    type="email"
                    defaultValue="support@kayra.com"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Log Seviyesi</label>
                  <select defaultValue="info" className="form-input">
                    <option value="error">Error</option>
                    <option value="warn">Warning</option>
                    <option value="info">Info</option>
                    <option value="debug">Debug</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Bakım Modu</label>
                  <select defaultValue="disabled" className="form-input">
                    <option value="disabled">Devre Dışı</option>
                    <option value="enabled">Aktif</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="btn-primary">
                  Sistem Ayarlarını Kaydet
                </button>
              </div>
            </div>
          </div>

          {/* Environment Information */}
          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Ortam Bilgileri
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Node.js Versiyonu
                  </label>
                  <p className="mt-1 text-gray-900 font-mono text-sm">
                    v20.19.1
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Next.js Versiyonu
                  </label>
                  <p className="mt-1 text-gray-900 font-mono text-sm">15.3.4</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Auth.js Versiyonu
                  </label>
                  <p className="mt-1 text-gray-900 font-mono text-sm">
                    5.0.0-beta.29
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Deployment
                  </label>
                  <p className="mt-1 text-gray-900 font-mono text-sm">
                    Development
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

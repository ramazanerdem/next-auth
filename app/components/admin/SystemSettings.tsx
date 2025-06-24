'use client'

import { useState } from 'react'

export default function SystemSettings() {
  const [settings, setSettings] = useState({
    siteName: 'Kayra Auth Sistemi',
    siteDescription: 'Next.js 15 + Auth.js v5 + OAuth + JWT',
    allowRegistration: true,
    requireEmailVerification: false,
    sessionTimeout: 60,
    maxLoginAttempts: 5,
    enableTwoFactor: false,
    enablePasswordReset: true,
    jwtExpiration: 7,
    refreshTokenExpiration: 30,
    enableGoogleAuth: true,
    enableGithubAuth: true,
    enableCredentialsAuth: true,
    maintenanceMode: false,
    enableLogging: true,
    logLevel: 'info',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Settings save logic would go here
    console.log('Settings saved:', settings)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-lg font-semibold text-gray-900">Sistem Ayarları</h1>
        <p className="text-gray-600 text-xs mt-1">
          Sistem konfigürasyonunu yönetin
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Settings */}
        <div className="card">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Genel Ayarlar
            </h3>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="form-label">Site Adı</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) =>
                  setSettings({ ...settings, siteName: e.target.value })
                }
                className="form-input"
              />
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="allowRegistration"
                checked={settings.allowRegistration}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    allowRegistration: e.target.checked,
                  })
                }
                className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
              />
              <label
                htmlFor="allowRegistration"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Yeni kullanıcı kaydına izin ver
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="requireEmailVerification"
                checked={settings.requireEmailVerification}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    requireEmailVerification: e.target.checked,
                  })
                }
                className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
              />
              <label
                htmlFor="requireEmailVerification"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                E-posta doğrulaması gerekli
              </label>
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
            <div>
              <label className="form-label">Oturum Zaman Aşımı (dakika)</label>
              <input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    sessionTimeout: parseInt(e.target.value),
                  })
                }
                className="form-input"
                min="1"
                max="1440"
              />
            </div>

            <div>
              <label className="form-label">Maksimum Giriş Denemesi</label>
              <input
                type="number"
                value={settings.maxLoginAttempts}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    maxLoginAttempts: parseInt(e.target.value),
                  })
                }
                className="form-input"
                min="1"
                max="10"
              />
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="enableTwoFactor"
                checked={settings.enableTwoFactor}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    enableTwoFactor: e.target.checked,
                  })
                }
                className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
              />
              <label
                htmlFor="enableTwoFactor"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                İki faktörlü kimlik doğrulamayı etkinleştir
              </label>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="card">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Sistem Durumu
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                <p className="text-sm font-medium text-gray-900">Database</p>
                <p className="text-xs text-gray-600">Bağlantı OK</p>
              </div>
              <div className="text-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                <p className="text-sm font-medium text-gray-900">
                  Auth Servisi
                </p>
                <p className="text-xs text-gray-600">Çalışıyor</p>
              </div>
              <div className="text-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-2"></div>
                <p className="text-sm font-medium text-gray-900">Cache</p>
                <p className="text-xs text-gray-600">Yavaş</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <button type="button" className="btn-secondary">
            İptal
          </button>
          <button type="submit" className="btn-primary">
            Kaydet
          </button>
        </div>
      </form>
    </div>
  )
}

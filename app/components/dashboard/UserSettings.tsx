'use client'

import { useState } from 'react'
import type { Session } from 'next-auth'

interface UserSettingsProps {
  session: Session
}

export default function UserSettings({ session }: UserSettingsProps) {
  const [activeTab, setActiveTab] = useState('general')
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: false,
      push: true,
      newsletter: false,
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      allowMessages: true,
    },
    security: {
      twoFactor: false,
      sessionTimeout: '24',
      ipRestriction: false,
    },
  })

  const tabs = [
    { id: 'general', label: 'Genel', icon: '⚙️' },
    { id: 'notifications', label: 'Bildirimler', icon: '🔔' },
    { id: 'privacy', label: 'Gizlilik', icon: '🔒' },
    { id: 'security', label: 'Güvenlik', icon: '🛡️' },
  ]

  const updateSetting = (
    category: string,
    key: string,
    value: boolean | string
  ) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category as keyof typeof settings],
        [key]: value,
      },
    })
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header - Fixed */}
      <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 md:py-6 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-lg md:text-xl font-semibold text-gray-900">
              Hesap Ayarları
            </h1>
          </div>
        </div>
      </header>

      {/* Content - Scrollable */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col lg:flex-row">
          {/* Sidebar Tabs - Mobile: Horizontal scroll, Desktop: Vertical */}
          <div className="lg:w-64 lg:flex-shrink-0 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200">
            <nav className="overflow-x-auto lg:overflow-x-visible p-4 lg:p-6">
              <div className="flex lg:flex-col space-x-4 lg:space-x-0 lg:space-y-2 min-w-max lg:min-w-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap lg:w-full ${
                      activeTab === tab.id
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                    }`}
                  >
                    <span className="text-base lg:text-lg">{tab.icon}</span>
                    <span className="hidden sm:block lg:block">
                      {tab.label}
                    </span>
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Settings Content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-3xl mx-auto">
              {activeTab === 'general' && (
                <div className="space-y-6 md:space-y-8">
                  <div className="card">
                    <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900">
                        Genel Ayarlar
                      </h3>
                    </div>
                    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                      <div>
                        <label className="form-label text-xs md:text-sm">
                          Dil Tercihi
                        </label>
                        <select className="form-input text-sm md:text-base">
                          <option value="tr">Türkçe</option>
                          <option value="en">English</option>
                        </select>
                      </div>

                      <div>
                        <label className="form-label text-xs md:text-sm">
                          Zaman Dilimi
                        </label>
                        <select className="form-input text-sm md:text-base">
                          <option value="Europe/Istanbul">
                            (GMT+3) İstanbul
                          </option>
                          <option value="UTC">(GMT+0) UTC</option>
                        </select>
                      </div>

                      <div>
                        <label className="form-label text-xs md:text-sm">
                          Tarih Formatı
                        </label>
                        <select className="form-input text-sm md:text-base">
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900">
                        Görünüm
                      </h3>
                    </div>
                    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                      <div>
                        <label className="form-label text-xs md:text-sm">
                          Tema
                        </label>
                        <select className="form-input text-sm md:text-base">
                          <option value="light">Açık Tema</option>
                          <option value="dark">Koyu Tema</option>
                          <option value="system">Sistem</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="card">
                  <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900">
                      Bildirim Tercihleri
                    </h3>
                  </div>
                  <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="mb-2 sm:mb-0">
                        <h4 className="text-sm md:text-base font-medium text-gray-900">
                          E-posta Bildirimleri
                        </h4>
                        <p className="text-xs md:text-sm text-gray-600">
                          Önemli güncellemeler için e-posta alın
                        </p>
                      </div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={settings.notifications.email}
                          onChange={(e) =>
                            updateSetting(
                              'notifications',
                              'email',
                              e.target.checked
                            )
                          }
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="mb-2 sm:mb-0">
                        <h4 className="text-sm md:text-base font-medium text-gray-900">
                          SMS Bildirimleri
                        </h4>
                        <p className="text-xs md:text-sm text-gray-600">
                          Güvenlik uyarıları için SMS alın
                        </p>
                      </div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={settings.notifications.sms}
                          onChange={(e) =>
                            updateSetting(
                              'notifications',
                              'sms',
                              e.target.checked
                            )
                          }
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="mb-2 sm:mb-0">
                        <h4 className="text-sm md:text-base font-medium text-gray-900">
                          Push Bildirimleri
                        </h4>
                        <p className="text-xs md:text-sm text-gray-600">
                          Tarayıcı bildirimleri göster
                        </p>
                      </div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={settings.notifications.push}
                          onChange={(e) =>
                            updateSetting(
                              'notifications',
                              'push',
                              e.target.checked
                            )
                          }
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="mb-2 sm:mb-0">
                        <h4 className="text-sm md:text-base font-medium text-gray-900">
                          Haber Bülteni
                        </h4>
                        <p className="text-xs md:text-sm text-gray-600">
                          Ürün güncellemeleri ve haberler
                        </p>
                      </div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={settings.notifications.newsletter}
                          onChange={(e) =>
                            updateSetting(
                              'notifications',
                              'newsletter',
                              e.target.checked
                            )
                          }
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="card">
                  <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900">
                      Gizlilik Ayarları
                    </h3>
                  </div>
                  <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                    <div>
                      <label className="form-label text-xs md:text-sm">
                        Profil Görünürlüğü
                      </label>
                      <select
                        className="form-input text-sm md:text-base"
                        value={settings.privacy.profileVisibility}
                        onChange={(e) =>
                          updateSetting(
                            'privacy',
                            'profileVisibility',
                            e.target.value
                          )
                        }
                      >
                        <option value="public">Herkese Açık</option>
                        <option value="private">Özel</option>
                        <option value="friends">Sadece Arkadaşlar</option>
                      </select>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="mb-2 sm:mb-0">
                        <h4 className="text-sm md:text-base font-medium text-gray-900">
                          E-posta Adresini Göster
                        </h4>
                        <p className="text-xs md:text-sm text-gray-600">
                          Profilinizde e-posta adresini göster
                        </p>
                      </div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={settings.privacy.showEmail}
                          onChange={(e) =>
                            updateSetting(
                              'privacy',
                              'showEmail',
                              e.target.checked
                            )
                          }
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="mb-2 sm:mb-0">
                        <h4 className="text-sm md:text-base font-medium text-gray-900">
                          Mesajlaşmaya İzin Ver
                        </h4>
                        <p className="text-xs md:text-sm text-gray-600">
                          Diğer kullanıcıların size mesaj göndermesine izin ver
                        </p>
                      </div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={settings.privacy.allowMessages}
                          onChange={(e) =>
                            updateSetting(
                              'privacy',
                              'allowMessages',
                              e.target.checked
                            )
                          }
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6 md:space-y-8">
                  <div className="card">
                    <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900">
                        Güvenlik Ayarları
                      </h3>
                    </div>
                    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <div className="mb-2 sm:mb-0">
                          <h4 className="text-sm md:text-base font-medium text-gray-900">
                            İki Faktörlü Doğrulama
                          </h4>
                          <p className="text-xs md:text-sm text-gray-600">
                            Hesabınız için ekstra güvenlik katmanı ekleyin
                          </p>
                        </div>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={settings.security.twoFactor}
                            onChange={(e) =>
                              updateSetting(
                                'security',
                                'twoFactor',
                                e.target.checked
                              )
                            }
                          />
                          <span className="slider"></span>
                        </label>
                      </div>

                      <div>
                        <label className="form-label text-xs md:text-sm">
                          Oturum Zaman Aşımı
                        </label>
                        <select
                          className="form-input text-sm md:text-base"
                          value={settings.security.sessionTimeout}
                          onChange={(e) =>
                            updateSetting(
                              'security',
                              'sessionTimeout',
                              e.target.value
                            )
                          }
                        >
                          <option value="1">1 Saat</option>
                          <option value="6">6 Saat</option>
                          <option value="24">24 Saat</option>
                          <option value="168">1 Hafta</option>
                        </select>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <div className="mb-2 sm:mb-0">
                          <h4 className="text-sm md:text-base font-medium text-gray-900">
                            IP Kısıtlaması
                          </h4>
                          <p className="text-xs md:text-sm text-gray-600">
                            Sadece belirli IP adreslerinden erişime izin ver
                          </p>
                        </div>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={settings.security.ipRestriction}
                            onChange={(e) =>
                              updateSetting(
                                'security',
                                'ipRestriction',
                                e.target.checked
                              )
                            }
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900">
                        Şifre ve Giriş
                      </h3>
                    </div>
                    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 md:p-4">
                        <p className="text-xs md:text-sm text-yellow-800">
                          <span className="font-medium">Not:</span> Bu hesap{' '}
                          {session.user?.email?.includes('admin')
                            ? 'credentials'
                            : 'OAuth'}{' '}
                          ile oluşturulmuştur. Şifre değiştirme seçenekleri{' '}
                          {session.user?.email?.includes('admin')
                            ? 'bu hesap türü için mevcut değildir.'
                            : 'OAuth sağlayıcı üzerinden yönetilmelidir.'}
                        </p>
                      </div>

                      <div className="space-y-3 md:space-y-4">
                        <button
                          className="w-full sm:w-auto btn-secondary text-sm md:text-base"
                          disabled
                        >
                          Şifre Değiştir
                        </button>
                        <button className="w-full sm:w-auto btn-secondary text-sm md:text-base">
                          Aktif Oturumları Göster
                        </button>
                        <button className="w-full sm:w-auto btn-secondary text-sm md:text-base text-red-600 border-red-200 hover:bg-red-50">
                          Tüm Oturumları Sonlandır
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-6 md:mt-8">
                <button className="btn-secondary text-sm md:text-base">
                  Varsayılanları Geri Yükle
                </button>
                <button className="btn-primary text-sm md:text-base">
                  Değişiklikleri Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

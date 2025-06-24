'use client'

import { useState } from 'react'
import type { Session } from 'next-auth'
import Image from 'next/image'
import { getProviderName } from '@/app/lib/functions/provider'

interface UserProfileProps {
  session: Session
}

export default function UserProfile({ session }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: session.user?.name || '',
    email: session.user?.email || '',
    bio: 'Henüz biyografi eklenmemiş.',
    location: 'Türkiye',
    website: '',
    twitter: '',
    github: '',
    linkedin: '',
  })

  const handleSave = () => {
    setIsEditing(false)
    // TODO: API call to update profile
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header - Fixed */}
      <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 md:py-6 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-lg md:text-xl font-semibold text-gray-900">
              Profil Bilgileri
            </h1>
          </div>
          <div className="flex items-center space-x-4 flex-shrink-0 ml-4">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`rounded-lg font-medium transition-colors duration-200 cursor-pointer text-xs md:text-sm px-3 py-2 md:px-4 md:py-2 ${
                isEditing ? 'btn-secondary' : 'btn-primary'
              }`}
            >
              {isEditing ? 'İptal' : 'Düzenle'}
            </button>
          </div>
        </div>
      </header>

      {/* Content - Scrollable */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          {/* Profile Header */}
          <div className="card">
            <div className="p-4 md:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-900 rounded-full flex items-center justify-center text-white text-2xl md:text-3xl font-bold flex-shrink-0">
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="User Avatar"
                      width={96}
                      height={96}
                      className="rounded-full object-cover w-20 h-20 md:w-24 md:h-24"
                    />
                  ) : (
                    <span>{session.user?.name?.charAt(0) || 'U'}</span>
                  )}
                </div>
                <div className="text-center sm:text-left flex-1 min-w-0">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 truncate">
                    {profileData.name}
                  </h2>
                  <p className="text-gray-600 mb-2 truncate">
                    {profileData.email}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <span className="text-xs md:text-sm text-gray-500">
                      {getProviderName(session)} ile bağlı
                    </span>
                  </div>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 ring-1 ring-green-200">
                      Aktif Hesap
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 ring-1 ring-gray-200">
                      Standart Kullanıcı
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Basic Information */}
            <div className="card">
              <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
                <h3 className="text-base md:text-lg font-semibold text-gray-900">
                  Temel Bilgiler
                </h3>
              </div>
              <div className="p-4 md:p-6 space-y-4">
                <div>
                  <label className="form-label text-xs md:text-sm">
                    Ad Soyad
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          name: e.target.value,
                        })
                      }
                      className="form-input text-sm md:text-base"
                    />
                  ) : (
                    <p className="text-sm md:text-base text-gray-900 break-words">
                      {profileData.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="form-label text-xs md:text-sm">
                    E-posta
                  </label>
                  <p className="text-sm md:text-base text-gray-900 break-words">
                    {profileData.email}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    E-posta adresi değiştirilemez
                  </p>
                </div>

                <div>
                  <label className="form-label text-xs md:text-sm">Konum</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          location: e.target.value,
                        })
                      }
                      className="form-input text-sm md:text-base"
                    />
                  ) : (
                    <p className="text-sm md:text-base text-gray-900 break-words">
                      {profileData.location}
                    </p>
                  )}
                </div>

                <div>
                  <label className="form-label text-xs md:text-sm">
                    Biyografi
                  </label>
                  {isEditing ? (
                    <textarea
                      value={profileData.bio}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          bio: e.target.value,
                        })
                      }
                      className="form-input min-h-[100px] resize-none text-sm md:text-base"
                      rows={4}
                    />
                  ) : (
                    <p className="text-sm md:text-base text-gray-900 break-words">
                      {profileData.bio}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="card">
              <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
                <h3 className="text-base md:text-lg font-semibold text-gray-900">
                  Sosyal Bağlantılar
                </h3>
              </div>
              <div className="p-4 md:p-6 space-y-4">
                <div>
                  <label className="form-label text-xs md:text-sm">
                    Website
                  </label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={profileData.website}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          website: e.target.value,
                        })
                      }
                      className="form-input text-sm md:text-base"
                      placeholder="https://website.com"
                    />
                  ) : (
                    <p className="text-sm md:text-base text-gray-900 break-words">
                      {profileData.website || 'Belirtilmemiş'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="form-label text-xs md:text-sm">
                    GitHub
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.github}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          github: e.target.value,
                        })
                      }
                      className="form-input text-sm md:text-base"
                      placeholder="kullaniciadi"
                    />
                  ) : (
                    <p className="text-sm md:text-base text-gray-900 break-words">
                      {profileData.github || 'Belirtilmemiş'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="form-label text-xs md:text-sm">
                    LinkedIn
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.linkedin}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          linkedin: e.target.value,
                        })
                      }
                      className="form-input text-sm md:text-base"
                      placeholder="kullaniciadi"
                    />
                  ) : (
                    <p className="text-sm md:text-base text-gray-900 break-words">
                      {profileData.linkedin || 'Belirtilmemiş'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Account Information */}
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
                    Kullanıcı ID
                  </label>
                  <p className="mt-1 text-sm md:text-base text-gray-900 font-mono break-all">
                    {session.user?.id || 'Belirtilmemiş'}
                  </p>
                </div>
                <div className="min-w-0">
                  <label className="text-xs md:text-sm font-medium text-gray-700">
                    Hesap Türü
                  </label>
                  <p className="mt-1 text-sm md:text-base text-gray-900 capitalize">
                    {session.user?.role || 'User'}
                  </p>
                </div>
                <div className="min-w-0">
                  <label className="text-xs md:text-sm font-medium text-gray-700">
                    Giriş Yöntemi
                  </label>
                  <p className="mt-1 text-sm md:text-base text-gray-900">
                    {getProviderName(session)}
                  </p>
                </div>
                <div className="min-w-0">
                  <label className="text-xs md:text-sm font-medium text-gray-700">
                    Hesap Durumu
                  </label>
                  <p className="mt-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Aktif
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          {isEditing && (
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setIsEditing(false)}
                className="btn-secondary text-sm md:text-base"
              >
                İptal
              </button>
              <button
                onClick={handleSave}
                className="btn-primary text-sm md:text-base"
              >
                Kaydet
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

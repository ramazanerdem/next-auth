'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import type { Session } from 'next-auth'
import { getProviderName } from '@/app/lib/functions/provider'
import { LogOut, X } from 'lucide-react'

interface MenuItem {
  href: string
  label: string
  icon: React.ReactNode
}

interface SidebarProps {
  session: Session
  title: string
  subtitle?: string
  menuItems: MenuItem[]
}

export default function Sidebar({
  session,
  title,
  subtitle,
  menuItems,
}: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false) // Mobilde varsayılan kapalı
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setSidebarOpen(true) // Desktop'ta varsayılan açık
      } else {
        setSidebarOpen(false) // Mobile'da varsayılan kapalı
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Mobilde menü öğesine tıklandığında sidebar'ı kapat
  const handleMenuClick = () => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  // Mobil header için setSidebarOpen fonksiyonunu global olarak kullan
  useEffect(() => {
    if (typeof window !== 'undefined') {
      ;(window as Window & typeof globalThis).toggleMobileSidebar = () =>
        setSidebarOpen(true)
    }
  }, [])

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Mobilde tamamen gizli, Desktop'ta görünür */}
      {(!isMobile || sidebarOpen) && (
        <div
          className={`
            ${isMobile ? 'fixed inset-y-0 left-0 z-50' : 'relative'}
            ${!isMobile && !sidebarOpen ? 'w-16' : 'w-64'}
            bg-white border-r border-gray-200 transition-all duration-300 ease-in-out 
            flex flex-col h-full
          `}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2
                className={`text-xl font-semibold text-gray-900 ${
                  !isMobile && !sidebarOpen ? 'hidden' : 'block'
                }`}
              >
                {title}
              </h2>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200"
              >
                {isMobile && sidebarOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <div
                    className={`w-4 h-4 border-2 border-gray-400 ${
                      !isMobile && !sidebarOpen ? 'border-l-0' : 'border-r-0'
                    }`}
                  />
                )}
              </button>
            </div>

            {/* User Info */}
            {(isMobile || sidebarOpen) && (
              <div className="mt-4 p-4 bg-gray-50 ring-1 ring-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 truncate">
                      {session.user?.name}
                    </p>
                    <p className="text-xs text-gray-600 truncate">
                      {session.user?.email}
                    </p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-500 truncate">
                        {subtitle || `${getProviderName(session)} bağlantısı`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 flex flex-col gap-2 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleMenuClick}
                  className={`
                    sidebar-item flex items-center w-full
                    ${
                      isMobile || sidebarOpen
                        ? 'px-3 py-2 gap-3'
                        : 'justify-center px-2 py-2'
                    }
                    ${isActive ? 'active' : ''}
                  `}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span
                    className={`${
                      isMobile || sidebarOpen ? 'block' : 'hidden'
                    } truncate`}
                  >
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className={`
                sidebar-item text-left flex items-center space-x-3 w-full
                ${
                  isMobile || sidebarOpen
                    ? 'px-3 py-2'
                    : 'justify-center px-2 py-2'
                }
                text-red-600 hover:bg-red-50
              `}
            >
              <LogOut className="w-4 h-4 flex-shrink-0" />
              <span
                className={`${
                  isMobile || sidebarOpen ? 'block' : 'hidden'
                } truncate`}
              >
                Çıkış Yap
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

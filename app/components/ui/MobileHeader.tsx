'use client'

import { Menu } from 'lucide-react'

// Extend Window interface
declare global {
  interface Window {
    toggleMobileSidebar?: () => void
  }
}

interface MobileHeaderProps {
  title: string
}

export default function MobileHeader({ title }: MobileHeaderProps) {
  const handleMenuClick = () => {
    if (typeof window !== 'undefined' && window.toggleMobileSidebar) {
      window.toggleMobileSidebar()
    }
  }

  return (
    <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      <button
        onClick={handleMenuClick}
        className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
      >
        <Menu className="w-5 h-5" />
      </button>
    </div>
  )
}

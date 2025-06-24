import AdminLoginForm from '@/app/components/auth/AdminLoginForm'
import Link from 'next/link'

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">
            Admin Girişi
          </h1>
          <p className="text-gray-600">Admin hesabınızla sisteme giriş yapın</p>
        </div>

        <AdminLoginForm />

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
          >
            ← Ana sayfaya dön
          </Link>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Test Bilgileri
          </h3>
          <p className="text-sm text-gray-600">
            Kullanıcı Adı: <span className="font-mono">admin</span>
          </p>
          <p className="text-sm text-gray-600">
            Şifre: <span className="font-mono">admin</span>
          </p>
        </div>
      </div>
    </div>
  )
}

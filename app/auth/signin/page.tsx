import LoginButtons from '@/app/components/auth/LoginButtons'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-lg px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">
            Giriş Yap
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Hesabınıza erişmek için bir giriş yöntemi seçin
          </p>
        </div>

        <LoginButtons />

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
          >
            ← Ana sayfaya dön
          </Link>
        </div>
      </div>
    </div>
  )
}

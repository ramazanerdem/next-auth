import Link from 'next/link'

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <div className="w-8 h-8 bg-red-500 rounded-full"></div>
        </div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          Giriş Hatası
        </h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Giriş işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.
        </p>
        <div className="space-y-4">
          <Link
            href="/auth/signin"
            className="btn-primary inline-flex items-center w-full justify-center"
          >
            Tekrar Dene
          </Link>
          <Link
            href="/"
            className="btn-secondary inline-flex items-center w-full justify-center"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  )
}

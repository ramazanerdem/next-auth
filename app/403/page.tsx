import Link from 'next/link'

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-8xl font-bold text-gray-200 mb-6">403</div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          Erişim Engellendi
        </h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Bu sayfa sadece admin kullanıcılar için erişilebilir.
        </p>
        <div className="space-y-4">
          <Link
            href="/"
            className="btn-primary inline-flex items-center w-full justify-center"
          >
            Ana Sayfaya Dön
          </Link>
          <Link
            href="/dashboard"
            className="btn-secondary inline-flex items-center w-full justify-center"
          >
            Dashboard&apos;a Git
          </Link>
        </div>
      </div>
    </div>
  )
}

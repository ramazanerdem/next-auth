import { auth } from '@/auth'
import LoginButtons from '@/app/components/auth/LoginButtons'
import Link from 'next/link'

const techStack = [
  {
    name: 'Next.js 15',
    description: 'React framework with App Router',
    color: 'bg-black text-white',
    version: 'v15+',
  },
  {
    name: 'Auth.js v5',
    description: 'Modern authentication library',
    color: 'bg-blue-600 text-white',
    version: 'v5+',
  },
  {
    name: 'TypeScript',
    description: 'Type-safe JavaScript development',
    color: 'bg-blue-500 text-white',
    version: 'v5+',
  },
  {
    name: 'TailwindCSS v4',
    description: 'Utility-first CSS framework',
    color: 'bg-cyan-500 text-white',
    version: 'v4+',
  },
  {
    name: 'OAuth Providers',
    description: 'Google, GitHub integration',
    color: 'bg-green-600 text-white',
    version: 'Multi-provider',
  },
  {
    name: 'JWT',
    description: 'Secure token-based authentication',
    color: 'bg-purple-600 text-white',
    version: 'HS256',
  },
]

const appSpecs = [
  {
    name: 'Role-Based Erişim Kontrolü',
    description: 'Kullanıcı ve admin rolleri ile güvenli erişim kontrolü',
    color1: 'bg-green-600',
    color2: 'bg-green-100',
  },
  {
    name: 'OAuth Entegrasyonu',
    description: 'Google ve GitHub ile hızlı giriş imkanı',
    color1: 'bg-blue-600',
    color2: 'bg-blue-100',
  },
  {
    name: 'JWT Token Güvenliği',
    description: 'Güvenli token tabanlı kimlik doğrulama sistemi',
    color1: 'bg-purple-600',
    color2: 'bg-purple-100',
  },
  {
    name: 'Admin Dashboard',
    description: 'Kullanıcı yönetimi ve sistem izleme paneli',
    color1: 'bg-yellow-600',
    color2: 'bg-yellow-100',
  },
  {
    name: 'Güvenlik Logları',
    description: 'Güvenlik loglarını izleme ve raporlama',
    color1: 'bg-red-600',
    color2: 'bg-red-100',
  },
  {
    name: 'Responsive Design',
    description: 'Tüm cihazlarda mükemmel kullanıcı deneyimi',
    color1: 'bg-gray-600',
    color2: 'bg-gray-100',
  },
]

export default async function HomePage() {
  const session = await auth()

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-900 rounded"></div>
            <h1 className="text-2xl font-semibold text-gray-900">Kayra Case</h1>
          </div>
          <nav className="flex items-center gap-2">
            {session && (
              <>
                <Link href="/dashboard" className="nav-link">
                  Dashboard
                </Link>
                {session.user?.role === 'admin' && (
                  <Link href="/admin" className="nav-link">
                    Admin Panel
                  </Link>
                )}
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Modern Kimlik Doğrulama Sistemi
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Next.js 15, Auth.js v5 ve modern web teknolojileri ile geliştirilmiş
            güvenli kimlik doğrulama platformu
          </p>

          {!session ? (
            <div id="login" className="space-y-8">
              <div className="card max-w-md mx-auto">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 text-center">
                    Giriş Seçenekleri
                  </h3>
                </div>
                <div className="p-6">
                  <LoginButtons />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="card max-w-md mx-auto p-6">
                <p className="text-xl text-gray-900 mb-4">
                  Hoş geldin,{' '}
                  <span className="font-semibold">{session.user?.name}</span>
                </p>
                <div className="flex flex-col space-y-3">
                  <Link href="/dashboard" className="btn-primary">
                    Dashboard&apos;a Git
                  </Link>
                  {session.user?.role === 'admin' && (
                    <Link href="/admin" className="btn-secondary">
                      Admin Panel
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tech Stack Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Tech Stack
            </h3>
            <p className="text-gray-600">
              Bu proje modern web teknolojileri ile geliştirilmiştir
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
              <div key={index} className="card overflow-hidden">
                <div className={`px-4 py-3 ${tech.color}`}>
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{tech.name}</h4>
                    <span className="text-xs opacity-80">{tech.version}</span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600">{tech.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Özellikler
            </h3>
            <p className="text-gray-600">
              Kapsamlı kimlik doğrulama ve yetkilendirme özellikleri
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appSpecs.map((spec, index) => (
              <div key={index} className="card p-6">
                <div
                  className={`w-12 h-12 ${spec.color2} rounded-lg flex items-center justify-center mb-4`}
                >
                  <div className={`w-6 h-6 ${spec.color1} rounded`}></div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {spec.name}
                </h4>
                <p className="text-sm text-gray-600">{spec.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            © 2025 Ramazan ERDEM tarafından geliştirilmiştir.
          </p>
        </footer>
      </main>
    </div>
  )
}

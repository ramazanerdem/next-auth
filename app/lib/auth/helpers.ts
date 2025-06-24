import { auth } from '@/auth'
import { Session, User } from 'next-auth'
import { redirect } from 'next/navigation'

/**
 * Server-side session kontrolü
 * Kullanıcının giriş yapmış olup olmadığını kontrol eder
 */
export async function getSession() {
  return await auth()
}

/**
 * Giriş yapmış kullanıcı kontrolü
 * Eğer kullanıcı giriş yapmamışsa login sayfasına yönlendirir
 */
export async function requireAuth() {
  const session = await auth()
  if (!session || !session.user) {
    redirect('/auth/signin')
  }

  return session
}

/**
 * Admin yetkisi kontrolü
 * Eğer kullanıcı admin değilse 403 sayfasına yönlendirir
 */
export async function requireAdmin() {
  const session = await requireAuth()

  if (session.user.role !== 'admin') {
    redirect('/403')
  }

  return session
}

/**
 * Belirli bir role sahip olup olmadığını kontrol eder
 */
export async function hasRole(requiredRole: string) {
  const session = await auth()

  if (!session || !session.user) {
    return false
  }

  return session.user.role === requiredRole
}

/**
 * Kullanıcının kendisinin mi yoksa admin'in mi işlem yapmaya çalıştığını kontrol eder
 * @param targetUserId - İşlem yapılacak kullanıcının ID'si
 */
export async function canModifyUser(targetUserId: string) {
  const session = await auth()

  if (!session || !session.user) {
    return false
  }

  // Kullanıcı kendisi veya admin ise izin ver
  return session.user.id === targetUserId || session.user.role === 'admin'
}

/**
 * API route'lar için session kontrolü
 * NextResponse ile hata döndürür
 */
export async function getApiSession() {
  const session = await auth()

  return {
    session,
    isAuthenticated: !!session,
    isAdmin: session?.user?.role === 'admin',
    userId: session?.user?.id || null,
  }
}

/**
 * Kullanıcı rolüne göre erişilebilir sayfaları filtreler
 */
export function getAccessibleRoutes(userRole?: string) {
  const publicRoutes = [
    { path: '/', name: 'Ana Sayfa', icon: '🏠' },
    { path: '/login', name: 'Giriş Yap', icon: '🔑' },
  ]

  const userRoutes = [
    { path: '/dashboard', name: 'Dashboard', icon: '📊' },
    { path: '/profile', name: 'Profil', icon: '👤' },
    { path: '/settings', name: 'Ayarlar', icon: '⚙️' },
  ]

  const adminRoutes = [
    { path: '/admin', name: 'Admin Panel', icon: '👑' },
    { path: '/admin/users', name: 'Kullanıcı Yönetimi', icon: '👥' },
    { path: '/admin/settings', name: 'Sistem Ayarları', icon: '🔧' },
    { path: '/admin/logs', name: 'Sistem Logları', icon: '📋' },
  ]

  if (!userRole) {
    return publicRoutes
  }

  if (userRole === 'admin') {
    return [...publicRoutes, ...userRoutes, ...adminRoutes]
  }

  return [...publicRoutes, ...userRoutes]
}

/**
 * Güvenlik için kullanıcı verilerini sanitize eder
 */
export function sanitizeUser(user: User) {
  if (!user) return null

  const { id, name, email, image, role } = user

  return {
    id,
    name: name || 'Anonim Kullanıcı',
    email: email || '',
    image: image || null,
    role: role || 'user',
  }
}

/**
 * Session süresini kontrol eder
 */
export function isSessionValid(session: Session) {
  if (!session) return false

  // JWT token'ının geçerlilik süresini kontrol et
  const now = Math.floor(Date.now() / 1000)
  const exp = session.expires ? new Date(session.expires).getTime() / 1000 : 0

  return exp > now
}

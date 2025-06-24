import { auth, signOut } from '@/auth'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation'

/**
 * Kapsamlı kontrol ile session doğrulama
 */
export async function validateSession() {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return {
        isValid: false,
        user: null,
        error: 'No active session',
      }
    }

    // Session süresini kontrol et
    const now = new Date()
    const expiresAt = new Date(session.expires)

    if (now >= expiresAt) {
      return {
        isValid: false,
        user: null,
        error: 'Session expired',
      }
    }

    // Session süresi 5 dakika içinde doluyorsa yenileme gerekiyor
    const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60 * 1000)
    const shouldRefresh = expiresAt <= fiveMinutesFromNow

    return {
      isValid: true,
      user: session.user,
      session: session,
      shouldRefresh,
      expiresAt: expiresAt.toISOString(),
      error: null,
    }
  } catch (error) {
    console.error('Session validation error:', error)
    return {
      isValid: false,
      user: null,
      error: 'Session validation failed',
    }
  }
}

/**
 * Server-side session koruması için gerekli
 */
export async function requireValidSession() {
  const sessionCheck = await validateSession()
  if (!sessionCheck.isValid) {
    redirect('/auth/signin')
  }

  return sessionCheck
}

/**
 * Rol tabanlı erişim kontrolü
 */
export async function requireRole(requiredRole: string) {
  const sessionCheck = await requireValidSession()

  if (sessionCheck.user?.role !== requiredRole) {
    redirect('/403')
  }

  return sessionCheck
}

/**
 * Admin rolü için gerekli
 */
export async function requireAdmin() {
  return await requireRole('admin')
}

/**
 * Güvenli çıkış için temizlik
 */
export async function secureSignOut(redirectUrl: string = '/') {
  try {
    // Ekstra cookie veya local storage temizleme
    const cookieStore = await cookies()

    // Özel session cookie'leri kaldır
    const sessionCookies = [
      'next-auth.session-token',
      'next-auth.csrf-token',
      '__Secure-next-auth.session-token',
      '__Host-next-auth.csrf-token',
    ]

    sessionCookies.forEach((cookieName) => {
      cookieStore.delete(cookieName)
    })

    // Auth.js signOut çağrısı
    await signOut({
      redirect: true,
      redirectTo: redirectUrl,
    })
  } catch (error) {
    console.error('Secure sign out error:', error)
    redirect(redirectUrl)
  }
}

/**
 * Gerçek zamanlı doğrulama için session izleme
 */
export class SessionMonitor {
  private checkInterval: NodeJS.Timeout | null = null
  private onExpired?: () => void
  private onRefreshNeeded?: () => void

  constructor(options?: {
    onExpired?: () => void
    onRefreshNeeded?: () => void
  }) {
    this.onExpired = options?.onExpired
    this.onRefreshNeeded = options?.onRefreshNeeded
  }

  start(intervalMs: number = 60000) {
    // Her dakika bir kere kontrol et
    if (this.checkInterval) {
      this.stop()
    }

    this.checkInterval = setInterval(async () => {
      const sessionCheck = await validateSession()

      if (!sessionCheck.isValid) {
        this.onExpired?.()
        this.stop()
      } else if (sessionCheck.shouldRefresh) {
        this.onRefreshNeeded?.()
      }
    }, intervalMs)
  }

  stop() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval)
      this.checkInterval = null
    }
  }
}

/**
 * API session validation middleware
 */
export async function validateApiSession() {
  try {
    const sessionCheck = await validateSession()

    if (!sessionCheck.isValid) {
      return NextResponse.json(
        {
          error: 'Invalid session',
          message: sessionCheck.error,
        },
        { status: 401 }
      )
    }

    return {
      success: true,
      session: sessionCheck.session,
      user: sessionCheck.user,
    }
  } catch (error) {
    console.error('Session validation error:', error)
    return NextResponse.json(
      {
        error: 'Session validation failed',
        message: 'Unable to validate session',
      },
      { status: 500 }
    )
  }
}

/**
 * Kullanıcının belirli izinleri olup olmadığını kontrol et
 */
export async function hasPermission(
  permission: string,
  resourceId?: string
): Promise<boolean> {
  const sessionCheck = await validateSession()

  if (!sessionCheck.isValid) {
    return false
  }

  const { user } = sessionCheck

  // Temel rol tabanlı izinler
  switch (permission) {
    case 'admin:read':
    case 'admin:write':
    case 'admin:delete':
      return user?.role === 'admin'

    case 'user:read':
    case 'user:write':
      return user?.role === 'admin' || user?.role === 'user'

    case 'profile:edit':
      // Kullanıcılar kendi profillerini düzenleyebilir, yöneticiler ise herhangi bir profili düzenleyebilir
      return user?.role === 'admin' || user?.id === resourceId

    default:
      return false
  }
}

/**
 * Session meta verilerini almak için
 */
export async function getSessionMetadata() {
  const sessionCheck = await validateSession()

  if (!sessionCheck.isValid) {
    return null
  }

  return {
    userId: sessionCheck.user?.id,
    role: sessionCheck.user?.role,
    expiresAt: sessionCheck.expiresAt,
    shouldRefresh: sessionCheck.shouldRefresh,
    isValid: sessionCheck.isValid,
  }
}

/**
 * Client component için session yardımcı fonksiyonlar
 */
export const sessionUtils = {
  validateSession,
  requireValidSession,
  requireRole,
  requireAdmin,
  secureSignOut,
  hasPermission,
  getSessionMetadata,
}

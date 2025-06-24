// Auth.js v5 helper fonksiyonları
export {
  getSession,
  requireAuth,
  requireAdmin,
  hasRole,
  canModifyUser,
  getApiSession,
  getAccessibleRoutes,
  sanitizeUser,
  isSessionValid,
} from './helpers'

// Advanced session management
export {
  validateSession,
  requireValidSession,
  requireRole,
  secureSignOut,
  validateApiSession,
  hasPermission,
  getSessionMetadata,
  sessionUtils,
  SessionMonitor,
} from './session'

// Auth.js configuration'ları
export { auth, signIn, signOut } from '@/auth'

// TypeScript types
export type { Session, User } from 'next-auth'
export type { JWT } from 'next-auth/jwt'

// Custom types
export interface AuthUser {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
  role: string
}

export interface AuthSession {
  user: AuthUser
  expires: string
}

export interface ApiAuthResponse {
  session: AuthSession | null
  isAuthenticated: boolean
  isAdmin: boolean
  userId: string | null
}

// Constants
export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
} as const

export const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/admin-login',
  '/auth/signin',
  '/auth/error',
  '/403',
] as const

export const PROTECTED_ROUTES = ['/dashboard', '/profile', '/settings'] as const

export const ADMIN_ROUTES = [
  '/admin',
  '/admin/users',
  '/admin/settings',
  '/admin/logs',
] as const

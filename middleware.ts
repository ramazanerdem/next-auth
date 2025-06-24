import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Static files ve API routes'ları atla
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Public routes - always allow
  const publicRoutes = [
    '/',
    '/login',
    '/admin-login',
    '/auth/signin',
    '/auth/error',
    '/403',
  ]

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Get session
  const session = await auth()

  // Admin route protection
  if (pathname.startsWith('/admin')) {
    if (!session) {
      const redirectUrl = new URL('/auth/signin', req.url)
      redirectUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(redirectUrl)
    }

    if (session.user?.role !== 'admin') {
      return NextResponse.redirect(new URL('/403', req.url))
    }
  }

  // Protected routes protection
  if (
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/profile') ||
    pathname.startsWith('/settings')
  ) {
    if (!session) {
      const redirectUrl = new URL('/auth/signin', req.url)
      redirectUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(redirectUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}

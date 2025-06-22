import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // Admin route koruması
    if (pathname.startsWith('/admin') && token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/403', req.url))
    }

    // Dashboard access kontrolü
    if (pathname.startsWith('/dashboard') && !token) {
      return NextResponse.redirect(new URL('/auth/signin', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Public routes
        if (pathname === '/' || pathname.startsWith('/auth')) {
          return true
        }

        // Diğer tüm rotalar için token gerekli
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    /*
     * Bunlar haricinde tüm requestleri yakala:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

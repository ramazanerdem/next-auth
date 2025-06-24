import { NextRequest, NextResponse } from 'next/server'

// Rate limiting configuration
const RATE_LIMIT_WINDOWS = {
  LOGIN: 60 * 1000, // 1 minute
  API: 60 * 1000, // 1 minute
  ADMIN: 60 * 1000, // 1 minute
} as const

const RATE_LIMIT_MAX_REQUESTS = {
  LOGIN: 5, // 5 login attempts per minute
  API: 100, // 100 API requests per minute
  ADMIN: 50, // 50 admin requests per minute
} as const

// In-memory rate limiting store (production'da Redis kullanın)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

/**
 * Simple in-memory rate limiter
 */
export function checkRateLimit(
  identifier: string,
  windowMs: number,
  maxRequests: number
): { allowed: boolean; resetTime?: number } {
  const now = Date.now()
  const key = `${identifier}`

  const record = rateLimitStore.get(key)

  if (!record || now > record.resetTime) {
    // First request or window has expired
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs,
    })
    return { allowed: true }
  }

  if (record.count >= maxRequests) {
    return {
      allowed: false,
      resetTime: record.resetTime,
    }
  }

  // Increment count
  record.count++
  rateLimitStore.set(key, record)

  return { allowed: true }
}

/**
 * Get client IP address
 */
export function getClientIP(request: NextRequest): string {
  // Check various headers for real IP
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const cfConnectingIp = request.headers.get('cf-connecting-ip')

  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  if (realIp) {
    return realIp.trim()
  }

  if (cfConnectingIp) {
    return cfConnectingIp.trim()
  }

  // Fallback to unknown if no headers available
  return 'unknown'
}

/**
 * Check if IP is suspicious (blocked, malicious, etc.)
 */
export function isSuspiciousIP(ip: string): boolean {
  // Known malicious IP patterns
  const suspiciousPatterns = [
    /^10\.0\.0\./, // Example: block certain internal ranges
    // Add more patterns as needed
  ]

  return suspiciousPatterns.some((pattern) => pattern.test(ip))
}

/**
 * Apply rate limiting based on route type
 */
export function applyRateLimit(request: NextRequest): NextResponse | null {
  const clientIP = getClientIP(request)
  const pathname = request.nextUrl.pathname

  // Check for suspicious IP
  if (isSuspiciousIP(clientIP)) {
    console.warn(
      `🚫 [Security] Blocked suspicious IP: ${clientIP} accessing ${pathname}`
    )
    return NextResponse.json({ error: 'Access denied' }, { status: 403 })
  }

  let windowMs: number
  let maxRequests: number
  let rateLimitKey: string

  // Determine rate limit based on route type
  if (pathname.includes('/login') || pathname.includes('/admin-login')) {
    windowMs = RATE_LIMIT_WINDOWS.LOGIN
    maxRequests = RATE_LIMIT_MAX_REQUESTS.LOGIN
    rateLimitKey = `login:${clientIP}`
  } else if (pathname.startsWith('/api/')) {
    windowMs = RATE_LIMIT_WINDOWS.API
    maxRequests = RATE_LIMIT_MAX_REQUESTS.API
    rateLimitKey = `api:${clientIP}`
  } else if (pathname.startsWith('/admin')) {
    windowMs = RATE_LIMIT_WINDOWS.ADMIN
    maxRequests = RATE_LIMIT_MAX_REQUESTS.ADMIN
    rateLimitKey = `admin:${clientIP}`
  } else {
    // No rate limiting for other routes
    return null
  }

  const { allowed, resetTime } = checkRateLimit(
    rateLimitKey,
    windowMs,
    maxRequests
  )

  if (!allowed) {
    const waitTime = resetTime ? Math.ceil((resetTime - Date.now()) / 1000) : 60

    console.warn(
      `⚠️ [Security] Rate limit exceeded for ${clientIP} on ${pathname}`
    )

    return NextResponse.json(
      {
        error: 'Rate limit exceeded',
        message: `Too many requests. Try again in ${waitTime} seconds.`,
        retryAfter: waitTime,
      },
      {
        status: 429,
        headers: {
          'Retry-After': waitTime.toString(),
          'X-RateLimit-Limit': maxRequests.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': (resetTime || Date.now()).toString(),
        },
      }
    )
  }

  return null
}

/**
 * Add security headers to response
 */
export function addSecurityHeaders(response: NextResponse): NextResponse {
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('X-XSS-Protection', '1; mode=block')

  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "frame-ancestors 'none'",
  ].join('; ')

  response.headers.set('Content-Security-Policy', csp)

  return response
}

/**
 * Log security events
 */
export function logSecurityEvent(
  event: string,
  details: Record<string, unknown>,
  level: 'info' | 'warn' | 'error' = 'info'
) {
  const timestamp = new Date().toISOString()
  const logEntry = {
    timestamp,
    event,
    level,
    ...details,
  }

  if (process.env.NODE_ENV === 'development') {
    const icon = level === 'error' ? '🚨' : level === 'warn' ? '⚠️' : '🔒'
    console.log(`${icon} [Security] ${event}:`, logEntry)
  }

  // Production'da buraya proper logging service ekleyin
  // örn: Winston, DataDog, Sentry vb.
}

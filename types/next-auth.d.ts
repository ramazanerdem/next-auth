import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  /**
   * Session objesine custom alanlar ekliyoruz
   */
  interface Session {
    user: {
      id: string
      role: string
      provider?: string
    } & DefaultSession['user']
  }

  /**
   * User objesine custom alanlar ekliyoruz
   */
  interface User extends DefaultUser {
    role: string
    provider?: string
  }
}

declare module 'next-auth/jwt' {
  /**
   * JWT token'ına custom alanlar ekliyoruz
   */
  interface JWT extends DefaultJWT {
    role: string
    id: string
    provider?: string
  }
}

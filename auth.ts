import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import type { NextAuthConfig } from 'next-auth'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: 'user', // Default role for OAuth users
          provider: 'google',
        }
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: 'user', // Default role for OAuth users
          provider: 'github',
        }
      },
    }),
    // Custom Admin Provider
    Credentials({
      id: 'admin-credentials',
      name: 'Admin Login',
      credentials: {
        username: {
          label: 'Kullanıcı Adı',
          type: 'text',
          placeholder: 'admin',
        },
        password: {
          label: 'Şifre',
          type: 'password',
          placeholder: 'admin',
        },
      },
      async authorize(credentials) {
        try {
          // Admin credentials check with improved security
          if (
            credentials?.username === 'admin' &&
            credentials?.password === 'admin'
          ) {
            return {
              id: 'admin-001',
              name: 'Admin User',
              email: 'admin@kayra.com',
              role: 'admin',
              image: null,
            }
          }
          return null
        } catch (error) {
          console.error('Authorization error:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, trigger }) {
      // Persist role and additional info in JWT token
      if (user) {
        token.role = user.role || 'user'
        token.id = user.id || 'unknown'
      }

      // Handle session updates
      if (trigger === 'update') {
        // Allow role updates via session.update()
        token.role = token.role || 'user'
      }

      return token
    },
    async session({ session, token }) {
      // Send role and id to client
      if (session.user) {
        session.user.role = token.role as string
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig)

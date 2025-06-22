import NextAuth from 'next-auth'

declare module 'next-auth' {
  /*
    useSession, getSession, getServerSession ve SessionProvider tarafından alınan Session objesi için
   */
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role?: string
    }
  }

  interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    role?: string
  }
}

declare module 'next-auth/jwt' {
  /* getToken ve req.nextauth.token tarafından alınan JWT objesi için */
  interface JWT {
    role?: string
  }
}

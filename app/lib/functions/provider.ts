import { Session } from 'next-auth'

export const getProviderIcon = (session: Session) => {
  const provider = session?.user?.image?.includes('google')
    ? 'google'
    : session?.user?.image?.includes('github')
    ? 'github'
    : 'credentials'
  switch (provider) {
    case 'google':
      return '🔴'
    case 'github':
      return '⚫'
    case 'credentials':
      return '🔑'
    default:
      return '👤'
  }
}

export const getProviderName = (session: Session) => {
  const provider = session?.user?.image?.includes('google')
    ? 'google'
    : session?.user?.image?.includes('github')
    ? 'github'
    : 'credentials'
  switch (provider) {
    case 'google':
      return 'Google'
    case 'github':
      return 'GitHub'
    case 'credentials':
      return 'Email/Şifre'
    default:
      return 'Bilinmiyor'
  }
}

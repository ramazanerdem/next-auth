import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import UserProfile from '@/app/components/dashboard/UserProfile'

export default async function ProfilePage() {
  const session = await auth()

  if (!session) {
    redirect('/auth/signin')
  }

  return <UserProfile session={session} />
}

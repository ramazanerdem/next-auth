import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import UserSettings from '@/app/components/dashboard/UserSettings'

export default async function SettingsPage() {
  const session = await auth()

  if (!session) {
    redirect('/auth/signin')
  }

  return <UserSettings session={session} />
}

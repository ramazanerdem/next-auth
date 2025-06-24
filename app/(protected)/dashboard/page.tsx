import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import UserDashboard from '@/app/components/dashboard/UserDashboard'

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect('/auth/signin')
  }

  return <UserDashboard session={session} />
}

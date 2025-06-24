import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import AdminDashboard from '@/app/components/admin/AdminDashboard'

export default async function AdminPage() {
  const session = await auth()

  // Admin access kontrolü
  if (!session || session.user?.role !== 'admin') {
    redirect('/403')
  }

  return <AdminDashboard session={session} />
}

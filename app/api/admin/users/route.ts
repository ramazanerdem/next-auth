import { auth } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'

// Mock user database
const mockUsers = [
  {
    id: 'admin-001',
    name: 'Admin User',
    email: 'admin@kayra.com',
    role: 'admin',
    status: 'active',
    provider: 'credentials',
    lastLogin: '2024-06-24T04:25:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    loginAttempts: 0,
  },
  {
    id: 'user-001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'user',
    status: 'active',
    provider: 'google',
    lastLogin: '2024-06-23T15:30:00Z',
    createdAt: '2024-02-15T10:30:00Z',
    loginAttempts: 0,
  },
  {
    id: 'user-002',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'user',
    status: 'active',
    provider: 'github',
    lastLogin: '2024-06-23T09:15:00Z',
    createdAt: '2024-03-10T14:20:00Z',
    loginAttempts: 1,
  },
  {
    id: 'user-003',
    name: 'Mike Wilson',
    email: 'mike.wilson@example.com',
    role: 'user',
    status: 'inactive',
    provider: 'google',
    lastLogin: '2024-06-20T14:45:00Z',
    createdAt: '2024-04-05T08:15:00Z',
    loginAttempts: 3,
  },
]

/**
 * Kullanıcı Listesi
 * GET /api/admin/users
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    // Admin kontrolü
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const search = url.searchParams.get('search') || ''
    const role = url.searchParams.get('role') || 'all'
    const status = url.searchParams.get('status') || 'all'

    // Filtreleme
    const filteredUsers = mockUsers.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      const matchesRole = role === 'all' || user.role === role
      const matchesStatus = status === 'all' || user.status === status

      return matchesSearch && matchesRole && matchesStatus
    })

    // Sayfalama
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

    // İstatistikler
    const stats = {
      total: mockUsers.length,
      active: mockUsers.filter((u) => u.status === 'active').length,
      inactive: mockUsers.filter((u) => u.status === 'inactive').length,
      admins: mockUsers.filter((u) => u.role === 'admin').length,
      users: mockUsers.filter((u) => u.role === 'user').length,
      filtered: filteredUsers.length,
    }

    return NextResponse.json({
      users: paginatedUsers,
      pagination: {
        page,
        limit,
        total: filteredUsers.length,
        pages: Math.ceil(filteredUsers.length / limit),
      },
      stats,
      filters: { search, role, status },
    })
  } catch (error) {
    console.error('Admin Users GET Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

/**
 * Kullanıcı İşlemleri (Güncelleme, Silme)
 * POST /api/admin/users
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    // Admin kontrolü
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { action, userId, data } = body

    switch (action) {
      case 'create_user':
        const newUser = {
          id: `user-${Date.now()}`,
          name: data.name,
          email: data.email,
          role: data.role || 'user',
          status: 'active',
          provider: 'manual',
          lastLogin: null,
          createdAt: new Date().toISOString(),
          loginAttempts: 0,
        }

        return NextResponse.json({
          success: true,
          message: 'Kullanıcı başarıyla oluşturuldu',
          user: newUser,
          createdBy: session.user.name,
        })

      case 'update_user':
        const userIndex = mockUsers.findIndex((u) => u.id === userId)
        if (userIndex === -1) {
          return NextResponse.json(
            { error: 'Kullanıcı bulunamadı' },
            { status: 404 }
          )
        }

        const updatedUser = {
          ...mockUsers[userIndex],
          ...data,
          updatedAt: new Date().toISOString(),
        }

        return NextResponse.json({
          success: true,
          message: 'Kullanıcı başarıyla güncellendi',
          user: updatedUser,
          updatedBy: session.user.name,
        })

      case 'delete_user':
        const deleteIndex = mockUsers.findIndex((u) => u.id === userId)
        if (deleteIndex === -1) {
          return NextResponse.json(
            { error: 'Kullanıcı bulunamadı' },
            { status: 404 }
          )
        }

        return NextResponse.json({
          success: true,
          message: 'Kullanıcı başarıyla silindi',
          deletedUser: mockUsers[deleteIndex],
          deletedBy: session.user.name,
        })

      case 'bulk_update':
        const { userIds, updateData } = data
        const bulkUpdated = userIds
          .map((id: string) => {
            const user = mockUsers.find((u) => u.id === id)
            return user ? { ...user, ...updateData } : null
          })
          .filter(Boolean)

        return NextResponse.json({
          success: true,
          message: `${bulkUpdated.length} kullanıcı güncellendi`,
          updatedUsers: bulkUpdated,
          updatedBy: session.user.name,
        })

      case 'reset_password':
        const resetUser = mockUsers.find((u) => u.id === userId)
        if (!resetUser) {
          return NextResponse.json(
            { error: 'Kullanıcı bulunamadı' },
            { status: 404 }
          )
        }

        return NextResponse.json({
          success: true,
          message: 'Şifre sıfırlama e-postası gönderildi',
          user: resetUser,
          resetBy: session.user.name,
        })

      case 'toggle_status':
        const toggleUser = mockUsers.find((u) => u.id === userId)
        if (!toggleUser) {
          return NextResponse.json(
            { error: 'Kullanıcı bulunamadı' },
            { status: 404 }
          )
        }

        const newStatus = toggleUser.status === 'active' ? 'inactive' : 'active'

        return NextResponse.json({
          success: true,
          message: `Kullanıcı durumu ${newStatus} olarak güncellendi`,
          user: { ...toggleUser, status: newStatus },
          changedBy: session.user.name,
        })

      default:
        return NextResponse.json({ error: 'Geçersiz işlem' }, { status: 400 })
    }
  } catch (error) {
    console.error('Admin Users POST Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth()

    // Admin kontrolü
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { userId, ...updateData } = body

    const userIndex = mockUsers.findIndex((u) => u.id === userId)
    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı' },
        { status: 404 }
      )
    }

    // Güncelleme
    const updatedUser = {
      ...mockUsers[userIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      message: 'Kullanıcı başarıyla güncellendi',
      user: updatedUser,
      updatedBy: session.user.name,
    })
  } catch (error) {
    console.error('Admin Users PUT Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth()

    // Admin kontrolü
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const url = new URL(request.url)
    const userId = url.searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'Kullanıcı ID gerekli' },
        { status: 400 }
      )
    }

    const userIndex = mockUsers.findIndex((u) => u.id === userId)
    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı' },
        { status: 404 }
      )
    }

    const deletedUser = mockUsers[userIndex]

    return NextResponse.json({
      success: true,
      message: 'Kullanıcı başarıyla silindi',
      deletedUser,
      deletedBy: session.user.name,
    })
  } catch (error) {
    console.error('Admin Users DELETE Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

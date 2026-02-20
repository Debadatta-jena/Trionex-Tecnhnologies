import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  User,
  Settings,
  FileText,
  MessageSquare,
  TrendingUp,
  Calendar,
  Mail,
  Phone
} from 'lucide-react'
import { useEffect, useState } from 'react'

export const metadata: Metadata = {
  title: 'Dashboard - GLYVEXA',
  description: 'Your personal dashboard for managing services and account information.',
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error('Failed to parse user data:', error)
      }
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="pt-20 pb-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="pt-20 pb-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Access Required</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Please log in to access your dashboard.</p>
                <Button asChild>
                  <a href="/login">Login</a>
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Mock data for dashboard
  const recentActivities = [
    { id: 1, type: 'service', title: 'AI Chatbot Consultation', date: '2024-01-15', status: 'completed' },
    { id: 2, type: 'contact', title: 'Contact Form Submitted', date: '2024-01-12', status: 'pending' },
    { id: 3, type: 'newsletter', title: 'Newsletter Subscription', date: '2024-01-10', status: 'active' },
  ]

  const services = [
    { id: 1, name: 'Website Development', status: 'In Progress', progress: 75 },
    { id: 2, name: 'AI Solutions', status: 'Completed', progress: 100 },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Welcome back, {user.name || 'User'}!
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Here's an overview of your account and recent activities.
                </p>
              </div>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Account Settings
              </Button>
            </div>
          </div>

          {/* Profile Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg">
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{user.name || 'User'}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {user.email}
                      </div>
                      {user.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {user.phone}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Account Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Services Used</span>
                    <span className="font-semibold">{services.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Total Interactions</span>
                    <span className="font-semibold">{recentActivities.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Account Status</span>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button className="w-full justify-start" variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                  <Button className="w-full justify-start" variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    View Services
                  </Button>
                  <Button className="w-full justify-start" variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Update Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Services & Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Current Services */}
            <Card>
              <CardHeader>
                <CardTitle>Your Services</CardTitle>
                <CardDescription>Track your ongoing and completed projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">{service.name}</h4>
                        <Badge variant={service.status === 'Completed' ? 'default' : 'secondary'}>
                          {service.status}
                        </Badge>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${service.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        {service.progress}% Complete
                      </p>
                    </div>
                  ))}
                  {services.length === 0 && (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                      No active services. Explore our services to get started!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Your latest interactions with GLYVEXA</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                        {activity.type === 'service' && <FileText className="h-4 w-4 text-blue-600" />}
                        {activity.type === 'contact' && <MessageSquare className="h-4 w-4 text-green-600" />}
                        {activity.type === 'newsletter' && <Mail className="h-4 w-4 text-purple-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {new Date(activity.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}


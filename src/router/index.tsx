import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import HomePage from '../pages/HomePage'
import CoursePage from '../pages/CoursePage'
import ProtectedRoute from '../components/ProtectedRoute'
import DashboardPage from '../pages/DashboardPage'
import AdminPage from '../pages/AdminPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/courses/:id',
    element: <CoursePage />
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute roles={['teacher', 'admin']}>
        <DashboardPage />
      </ProtectedRoute>
    )
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute roles={['admin']}>
        <AdminPage />
      </ProtectedRoute>
    )
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import HomePage from '../pages/HomePage'
import CoursePage from '../pages/CoursePage'
import ProtectedRoute from '../components/ProtectedRoute'
import DashboardPage from '../pages/DashboardPage'

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
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function Navbar() {
    const { token, logout, getRole } = useAuthStore()
    const navigate = useNavigate()
    const role = getRole()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-200 bg-white">
            <Link to="/" className="text-xl font-bold text-gray-900">Kodnavis</Link>

            <div className="flex items-center gap-6">
                <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
                {(role === 'teacher' || role === 'admin') && <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">Dashboard</Link>}
                {role === 'admin' && <Link to="/admin" className="text-gray-600 hover:text-gray-900 transition-colors">Admin</Link>}
                {token ? <button onClick={handleLogout} className="text-red-500 hover:text-red-700 transition-colors cursor-pointer">Logout</button> : <>
                    <Link to="/login" className="text-gray-600 hover:text-gray-900 transition-colors">Login</Link>
                    <Link to="/register" className="text-gray-600 hover:text-gray-900 transition-colors">Register</Link>
                </>}
            </div>
        </nav>
    )
}
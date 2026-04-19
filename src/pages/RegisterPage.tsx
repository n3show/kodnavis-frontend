import { useState } from 'react'
import { register } from '../api/auth'
import { Link, useNavigate } from 'react-router-dom'

export default function RegisterPage() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()

        try {
            await register(username, email, password)

            navigate('/login')
        } catch(err) {
            setError('failed to register')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-gray-200 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Create an account</h1>
                <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors">
                    Register
                </button>
                <p className="text-center text-sm text-gray-500 mt-4">
                    Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                </p>
            </form>
        </div>
    )
}
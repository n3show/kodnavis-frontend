import { useEffect, useState } from "react";
import { changeRole, getUsers } from "../api/admin";
import type { User } from "../types";

export default function AdminPage() {
    const [users, setUsers] = useState<User[]>([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [selectedRoles, setSelectedRoles] = useState<Record<string, string>>({})

    const fetchUsers = async () => {
        try {
            const users = await getUsers()
            setUsers(users.data)
        } catch(err) {
            setError("failed to fetch users")
        }

        setLoading(false)
    }

    useEffect(() => { fetchUsers() }, [])

    const handleRoleChange = async (userID: string) => {
        try {
            await changeRole(userID, selectedRoles[userID])
            fetchUsers()
        } catch(err) {
            setError('failed to change role')
        }
    }

    return (
        <div className="max-w-5xl mx-auto px-8 py-10">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Admin page</h1>
            {error && <p className="text-red-500">{error}</p>}
            {loading && <p>Loading...</p>}
            <table className="w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-gray-50 uppercase font-medium text-gray-700">
                    <tr>
                        <th className="px-6 py-3 border-b">Username</th>
                        <th className="px-6 py-3 border-b">Email</th>
                        <th className="px-6 py-3 border-b">Role</th>
                        <th className="px-6 py-3 border-b">Change Role</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                    <tr key={user.ID}>
                        <td className="px-6 py-4">{user.Username}</td>
                        <td className="px-6 py-4">{user.Email}</td>
                        <td className="px-6 py-4">{user.Role}</td>
                        <td className="px-6 py-4">
                            <select 
                                value={selectedRoles[user.ID] ?? user.Role}
                                onChange={(e) => setSelectedRoles({...selectedRoles, [user.ID]: e.target.value})}
                                className="border border-gray-300 rounded-lg p-2 text-sm mr-2"
                            >
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                                <option value="moderator">Moderator</option>
                                <option value="admin">Admin</option>
                            </select>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors" onClick={() => handleRoleChange(user.ID)}>Apply</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
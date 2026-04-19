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
        <div>
            {error && <p className="text-red-500">{error}</p>}
            {loading && <p>Loading...</p>}
            <table className="table-fixed text-sm text-left border-collapse">
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
                            >
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                                <option value="moderator">Moderator</option>
                                <option value="admin">Admin</option>
                            </select>
                            <button className="cursor-pointer bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => handleRoleChange(user.ID)}>Apply</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
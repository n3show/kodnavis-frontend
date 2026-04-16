import api from './axios'

export async function getUsers() {
    const response = await api.get('/admin/users')

    return response.data
}

export async function changeRole(id: string, role: string) {
    const response = await api.patch(`/admin/users/${id}/role`, {role})

    return response.data
}
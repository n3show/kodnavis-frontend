import api from './axios'

export async function getCourses() {
    const response = await api.get('/courses')

    return response.data
}

export async function getMyCourses() {
    const response = await api.get('/me/courses')

    return response.data
}

export async function getCourse(id: string) {
    const response = await api.get(`/courses/${id}`)
    
    return response.data
}

export async function createCourse(title: string, description: string) {
    const response = await api.post('/courses', {title, description})

    return response.data
}

export async function updateCourse(id: string, title: string, description: string, isPublished: boolean) {
    const response = await api.put(`/courses/${id}`, {title, description, isPublished})

    return response.data
}

export async function deleteCourse(id: string) {
    const response = await api.delete(`/courses/${id}`)

    return response.data
}
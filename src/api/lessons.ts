import api from './axios'

export async function getLessons(courseId: string) {
    const response = await api.get(`/courses/${courseId}/lessons`)

    return response.data
}

export async function getLesson(courseId: string, lessonId: string) {
    const response = await api.get(`/courses/${courseId}/lessons/${lessonId}`)    

    return response.data
}

export async function createLesson(courseId: string, title: string, content: string, orderIndex: number) {
    const response = await api.post(`/courses/${courseId}/lessons`, {title, content, orderIndex})

    return response.data
}

export async function updateLesson(courseId: string, lessonId: string, title: string, content: string, orderIndex: number) {
    const response = await api.put(`/courses/${courseId}/lessons/${lessonId}`, {title, content, orderIndex})

    return response.data
}

export async function deleteLesson(courseId: string, lessonId: string) {
    const response = await api.delete(`/courses/${courseId}/lessons/${lessonId}`)

    return response.data
}

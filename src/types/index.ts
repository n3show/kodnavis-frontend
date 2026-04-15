export interface User {
    ID: string
    Username: string
    Email: string
    Role: string
    CreatedAt: string
    UpdatedAt: string
}

export interface Course {
    ID: string
    TeacherID: string
    Title: string
    Description: string
    IsPublished: boolean
    CreatedAt: string
    UpdatedAt: string
}

export interface Lesson {
    ID: string
    CourseID: string
    Title: string
    Content: string
    OrderIndex: number
    CreatedAt: string
}
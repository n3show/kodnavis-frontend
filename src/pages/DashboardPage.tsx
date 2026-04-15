import React, { useEffect, useState } from "react";
import type { Course } from "../types";
import { createCourse, getMyCourses } from "../api/courses";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [courses, setCourses] = useState<Course[]>([])
    const [error, setError] = useState('')
    const [createError, setCreateError] = useState('')
    const [loading, setLoading] = useState(true)

    const fetchMyCourses = async () => {
        try {
            const response = await getMyCourses()
            setCourses(response.data)
        } catch(err) {
            setError('failed to fetch data')
        }

        setLoading(false)
    }

    useEffect(() => {
        fetchMyCourses()
    }, [])

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()

        try {
            console.log(title, description)
            await createCourse(title, description)
            
            setTitle('')
            setDescription('')

            fetchMyCourses()
        } catch(err) {
            setCreateError('failed to register')
        }
    }

    return (
        <div className="flex flex-col gap-4 p-8">
            <div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
                    <h1 className="text-xl font-semibold text-center">Create a course</h1>
                    <input
                        type="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        className="border border-gray-300 rounded p-2"
                    />
                    <input
                        type="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        className="border border-gray-300 rounded p-2"
                    />
                    {createError && <p className="text-red-500">{createError}</p>}
                    <button type="submit" className="bg-blue-500 text-white rounded p-2">
                        Create
                    </button>
                </form>
            </div>

            {error && <p className="text-red-500">{error}</p>}
            {loading && <p>Loading...</p>}
            
            {courses.map((course) => (
            <div className='cursor-pointer' key={course.ID} onClick={() => navigate(`/courses/${course.ID}`)}>
                <h2>{course.Title}</h2>
                <p>{course.Description}</p>
            </div>
            ))}
        </div>
    )
}
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
        <div className="max-w-4xl mx-auto px-8 py-10">
            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
                <p className="text-lg font-semibold text-gray-900 mb-4">Create a course</p>
                
                <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700">Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {createError && <p className="text-red-500">{createError}</p>}
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                    Create
                </button>
            </form>

            <h1 className="text-2xl font-bold text-gray-900 mb-8">My Courses</h1>

            {error && <p className="text-red-500">{error}</p>}
            {loading && <p>Loading...</p>}
            
            {courses.map((course) => (
                <div className='cursor-pointer border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow bg-white mb-4' key={course.ID} onClick={() => navigate(`/courses/${course.ID}`)}>
                    <div className="flex items-center justify-between mb-1">
                        <h2 className="text-lg font-semibold text-gray-900">{course.Title}</h2>
                        {course.IsPublished 
                            ? <span className="text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">Published</span>
                            : <span className="text-xs font-medium bg-gray-100 text-gray-500 px-3 py-1 rounded-full">Draft</span>
                        }
                    </div>
                    <p className="text-gray-500 text-sm">{course.Description}</p>
                </div>
            ))}
        </div>
    )
}
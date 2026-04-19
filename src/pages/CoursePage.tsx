import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourse } from "../api/courses";
import type { Course, Lesson } from "../types";
import { getLessons } from "../api/lessons";


export default function CoursePage() {
    const params = useParams()
    const navigate = useNavigate()

    const [course, setCourse] = useState<Course | null>(null)
    const [lessons, setLessons] = useState<Lesson[]>([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const course = await getCourse(String(params.id))
                setCourse(course.data)

                const lessons = await getLessons(course.data.ID)
                setLessons(lessons.data)
            } catch(err) {
                setError('failed to fetch data')
            }

            setLoading(false)
        }

        fetchCourse()
    }, [])

    return (
        <div className="max-w-4xl mx-auto px-8 py-10">
            <div>
                {error && <p className="text-red-500">{error}</p>}
                {loading && <p>Loading...</p>}
            </div>

            {course && (
                <div key={course.ID}>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.Title}</h1>
                    <p className="text-gray-500 mb-8">{course.Description}</p>
                </div>
            )}

            <div>
                <h1 className="text-xl font-semibold text-gray-900 mb-4">Lessons</h1>
                {lessons.map(lesson => (
                    <div className='border border-gray-200 rounded-xl p-6 mb-4 bg-white hover:shadow-md transition-shadow cursor-pointer' key={lesson.ID} onClick={() => navigate(`/courses/lessons/${lesson.ID}`)}>
                        <h2 className="text-lg font-medium text-gray-900 mb-1">{lesson.OrderIndex + 1}. {lesson.Title}</h2>
                        <p className="text-gray-500 text-sm">{lesson.Content}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

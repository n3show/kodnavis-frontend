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
        <div className="flex flex-col gap-4 p-8">
            {error && <p className="text-red-500">{error}</p>}
            {loading && <p>Loading...</p>}
            {course && (
                <div key={course.ID}>
                    <h2 className="text-lg font-semibold">{course.Title}</h2>
                    <p>{course.Description}</p>
                </div>
            )}
            {lessons.map(lesson => (
                <div className='cursor-pointer' key={lesson.ID} onClick={() => navigate(`/courses/lessons/${lesson.ID}`)}>
                    <h2 className="font-medium">{lesson.OrderIndex + 1}. {lesson.Title}</h2>
                    <p className="font-light">{lesson.Content}</p>
                </div>
            ))}
        </div>
    )
}

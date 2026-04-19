import {useState, useEffect} from 'react'
import {getCourses} from '../api/courses'
import type { Course } from '../types'
import { useNavigate } from 'react-router-dom'



export default function HomePage() {
    const navigate = useNavigate()
    const [courses, setCourses] = useState<Course[]>([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const courses = await getCourses()
                setCourses(courses.data)
            } catch(err) {
                setError("failed to fetch data")
            }

            setLoading(false)
        }
        
        fetchCourses()
    }, [])

    return (
       <div className='max-w-4xl mx-auto px-8 py-10'>
            {error && <p className="text-red-500">{error}</p>}
            {loading && <p>Loading...</p>}
            {courses.map((course) => (
            <div className="cursor-pointer border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow bg-white" key={course.ID} onClick={() => navigate(`/courses/${course.ID}`)}>
                <h2 className='text-lg font-semibold text-gray-900 mb-2'>{course.Title}</h2>
                <p className='text-gray-500 text-sm'>{course.Description}</p>
            </div>
            ))}
        </div>
    )
}

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
       <div className="flex flex-col gap-4 p-8">
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

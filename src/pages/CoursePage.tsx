import { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteCourse, getCourse, updateCourse } from "../api/courses";
import type { Course, Lesson } from "../types";
import { getLessons } from "../api/lessons";
import { useAuthStore } from "../store/authStore";


export default function CoursePage() {
    const { getUserID } = useAuthStore()
    const params = useParams()
    const navigate = useNavigate()

    const [course, setCourse] = useState<Course | null>(null)
    const [lessons, setLessons] = useState<Lesson[]>([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [showConfirm, setShowConfirm] = useState(false)
    
    const [isEditing, setIsEditing] = useState(false)
    const [editTitle, setEditTitle] = useState('')
    const [editDescription, setEditDescription] = useState('')
    const [editIsPublished, setEditIsPublished] = useState(false)


    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const course = await getCourse(String(params.id))
                setCourse(course.data)
                setEditTitle(course.data.Title)
                setEditDescription(course.data.Description)
                setEditIsPublished(course.data.IsPublished)

                const lessons = await getLessons(course.data.ID)
                setLessons(lessons.data)
            } catch(err) {
                setError('failed to fetch data')
            }

            setLoading(false)

        }

        fetchCourse()
    }, [])

    const toggleEditing = () => {
        setIsEditing(!isEditing)
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteCourse(id)
            navigate('/dashboard')
        } catch(err) {
            setError('failed to delete course')
        }
    }

    const handleSave = async () => {
        try {
            await updateCourse(course!.ID, editTitle, editDescription, editIsPublished)
            setCourse({...course!, Title: editTitle, Description: editDescription, IsPublished: editIsPublished})
            setIsEditing(false)
        } catch(err) {
            setError('failed to update course')
        }
    }

    return (
        <div className="max-w-4xl mx-auto px-8 py-10">
            <div>
                {error && <p className="text-red-500">{error}</p>}
                {loading && <p>Loading...</p>}
            </div>

            {course && (
                <div>
                    <div className="flex items-center justify-between mb-2">
                    {isEditing ? (
                        <div className="w-full">
                        <input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <textarea
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <label className="flex items-center gap-2 text-sm text-gray-700 mb-4">
                            <input
                            type="checkbox"
                            checked={editIsPublished}
                            onChange={(e) => setEditIsPublished(e.target.checked)}
                            />
                            Published
                        </label>
                        <div className="flex gap-2">
                            <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">Save</button>
                            <button onClick={toggleEditing} className="border border-gray-300 text-gray-700 font-medium py-2 px-6 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                        </div>
                        </div>
                    ) : (
                        <>
                        <h1 className="text-3xl font-bold text-gray-900">{course.Title}</h1>
                        {course.TeacherID === getUserID() && (
                            <div className="flex gap-2">
                                <button onClick={toggleEditing} className="border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">Edit</button>
                                <button onClick={() => setShowConfirm(true)} className="border border-red-300 text-red-600 font-medium py-2 px-4 rounded-lg hover:bg-red-50 transition-colors">
                                    Delete
                                </button>
                                {showConfirm && (
                                    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center">
                                        <div className="bg-white rounded-xl p-8 max-w-sm w-full">
                                            <h2 className="text-lg font-semibold text-gray-900 mb-2">Delete course?</h2>
                                            <p className="text-gray-500 text-sm mb-6">This action cannot be undone.</p>
                                            <div className="flex gap-3">
                                                <button onClick={() => handleDelete(course!.ID)} className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                                                    Delete
                                                </button>
                                                <button onClick={() => setShowConfirm(false)} className="border border-gray-300 text-gray-700 font-medium py-2 px-6 rounded-lg hover:bg-gray-50 transition-colors">
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        </>
                    )}
                    </div>
                    {!isEditing && <p className="text-gray-500 mb-8">{course.Description}</p>}
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

import { Navigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

export default function ProtectedRoute({ children, roles }: {
    children: React.ReactNode,
    roles?: string[]
}) {
    const {token, user, getRole} = useAuthStore()
    const role = user?.Role ?? getRole()

    if (!token) return <Navigate to="/login" />

    if (roles && !roles.includes(role ?? '')) {
       return <Navigate to="/" />
    }

    return <>{children}</>
}
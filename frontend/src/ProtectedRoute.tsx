import { useAppSelector } from './store/hooks'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth)
    console.log("protectedR", isAuthenticated)
    if (!isAuthenticated) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}

export default ProtectedRoute

import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute({ roles }) {
  const { user, token } = useSelector((s) => s.auth)
  if (!token || !user) return <Navigate to="/login" replace />
  if (roles && roles.length && !roles.includes(user.role)) return <Navigate to="/" replace />
  return <Outlet />
}



import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { fetchCourses } from '../features/courses/courseSlice'
import { fetchStatistics } from '../features/admin/adminSlice'

export default function Dashboard() {
  const { user, token } = useSelector((s) => s.auth)
  const { items: courses } = useSelector((s) => s.courses)
  const { statistics } = useSelector((s) => s.admin)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    if (token && user) {
      dispatch(fetchCourses())
      if (user.role === 'admin') {
        dispatch(fetchStatistics())
      }
    }
  }, [dispatch, token, user])

  if (!token || !user) {
    navigate('/login')
    return null
  }

  const myCourses = user.role === 'instructor' 
    ? courses.filter(c => c.instructor?._id === user.id)
    : courses.filter(c => c.students?.includes(user.id))

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      <nav className="bg-white shadow-md border-b sticky top-0 z-50">
        <div className="max-w-full px-6 lg:px-12">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-8">
              <Link to="/dashboard" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">E</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  EduNexus
                </span>
              </Link>
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-blue-50">
                Dashboard
              </Link>
              <Link to="/courses" className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-blue-50">
                Courses
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin/users" className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-blue-50">
                  Admin Panel
                </Link>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                <div className="text-xs text-gray-500 capitalize">{user.role}</div>
              </div>
              <button 
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200" 
                onClick={() => {
                  dispatch(logout())
                  navigate('/')
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1">
      <div className="max-w-full px-6 lg:px-12 py-10">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-600">Here's what's happening with your learning today.</p>
        </div>

        {/* Admin Dashboard */}
        {user.role === 'admin' && statistics && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Platform Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold mb-1">{statistics.totalUsers}</div>
                <div className="text-blue-100">Total Users</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold mb-1">{statistics.totalCourses}</div>
                <div className="text-purple-100">Courses</div>
              </div>
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold mb-1">{statistics.totalLectures}</div>
                <div className="text-pink-100">Lectures</div>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold mb-1">{statistics.totalAssignments}</div>
                <div className="text-orange-100">Assignments</div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold mb-1">{statistics.totalSubmissions}</div>
                <div className="text-green-100">Submissions</div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Link to="/admin/users" className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition border-2 border-transparent hover:border-blue-500">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Manage Users</h3>
                    <p className="text-gray-600">View and manage all platform users</p>
                  </div>
                </div>
              </Link>
              <Link to="/courses" className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition border-2 border-transparent hover:border-purple-500">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Manage Courses</h3>
                    <p className="text-gray-600">Oversee all courses and content</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Instructor Dashboard */}
        {user.role === 'instructor' && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">My Courses</h2>
              <Link to="/courses/create" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition">
                + Create Course
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {myCourses.length === 0 ? (
                <div className="col-span-3 bg-white p-12 rounded-xl shadow text-center">
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-xl font-semibold mb-2">No courses yet</h3>
                  <p className="text-gray-600 mb-4">Create your first course to get started</p>
                  <Link to="/courses/create" className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition">
                    Create Course
                  </Link>
                </div>
              ) : (
                myCourses.map(course => (
                  <Link key={course._id} to={`/courses/${course._id}`} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition border-2 border-transparent hover:border-blue-500">
                    <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>👥 {course.students?.length || 0} students</span>
                      <span className="text-blue-600 font-semibold">Manage →</span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        )}

        {/* Student Dashboard */}
        {user.role === 'student' && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">My Enrolled Courses</h2>
              <Link to="/courses" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition">
                Browse Courses
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {myCourses.length === 0 ? (
                <div className="col-span-3 bg-white p-12 rounded-xl shadow text-center">
                  <div className="text-6xl mb-4">🎓</div>
                  <h3 className="text-xl font-semibold mb-2">No enrolled courses</h3>
                  <p className="text-gray-600 mb-4">Start learning by enrolling in a course</p>
                  <Link to="/courses" className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition">
                    Browse Courses
                  </Link>
                </div>
              ) : (
                myCourses.map(course => (
                  <Link key={course._id} to={`/courses/${course._id}`} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition border-2 border-transparent hover:border-blue-500">
                    <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">By {course.instructor?.name}</span>
                      <span className="text-blue-600 font-semibold">Continue →</span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link to="/courses" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
              <div className="text-3xl mb-2">📚</div>
              <div className="font-semibold">All Courses</div>
            </Link>
            {user.role !== 'admin' && (
              <Link to="/courses" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
                <div className="text-3xl mb-2">💬</div>
                <div className="font-semibold">Messages</div>
              </Link>
            )}
            <Link to="/profile" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
              <div className="text-3xl mb-2">👤</div>
              <div className="font-semibold">Profile</div>
            </Link>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center cursor-pointer">
              <div className="text-3xl mb-2">⚙️</div>
              <div className="font-semibold">Settings</div>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Professional Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white mt-auto">
        <div className="max-w-full px-6 lg:px-12 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">E</span>
                </div>
                <span className="text-xl font-bold">EduNexus</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Empowering learners worldwide with cutting-edge online education. Join thousands of students and instructors in our learning community.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/courses" className="hover:text-blue-400 transition-colors">Browse Courses</Link></li>
                <li><Link to="/dashboard" className="hover:text-blue-400 transition-colors">Dashboard</Link></li>
                {user.role === 'instructor' && (
                  <li><Link to="/courses/create" className="hover:text-blue-400 transition-colors">Create Course</Link></li>
                )}
                {user.role === 'admin' && (
                  <li><Link to="/admin/users" className="hover:text-blue-400 transition-colors">Admin Panel</Link></li>
                )}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Community Forum</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact Support</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <span>📧</span>
                  <span>support@edunexus.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>📱</span>
                  <span>+1 (555) 123-4567</span>
                </li>
              </ul>
              <div className="flex gap-4 mt-4">
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  title="Follow us on Twitter"
                >
                  <span className="text-xl">𝕏</span>
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  title="Connect on LinkedIn"
                >
                  <span className="text-xl">in</span>
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  title="Like us on Facebook"
                >
                  <span className="text-xl">f</span>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  title="Follow us on Instagram"
                >
                  <span className="text-xl">📷</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} EduNexus. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}



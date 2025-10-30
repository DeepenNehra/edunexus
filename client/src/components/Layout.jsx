import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

export default function Layout({ children }) {
  const { user, token } = useSelector((s) => s.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // If not logged in, show minimal layout
  if (!token || !user) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Simple Navigation for non-logged in users */}
        <nav className="bg-white shadow-md border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">E</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  EduNexus
                </span>
              </Link>
              <div className="flex items-center gap-4">
                <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-blue-50">
                  Home
                </Link>
                <Link to="/courses" className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-blue-50">
                  Courses
                </Link>
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-blue-50"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="flex-1">
          {children}
        </div>
        {/* Simple Footer */}
        <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} EduNexus. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    )
  }

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
              <Link to="/profile" className="text-right hidden md:block hover:opacity-80 transition">
                <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                <div className="text-xs text-gray-500 capitalize">{user.role}</div>
              </Link>
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
          {children}
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


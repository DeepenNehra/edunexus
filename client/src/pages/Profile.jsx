import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'

export default function Profile() {
  const { user } = useSelector((s) => s.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  })

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const handleSave = () => {
    // TODO: Implement profile update API call
    setIsEditing(false)
  }

  if (!user) {
    navigate('/login')
    return null
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            My Profile
          </h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-4xl font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="text-xl font-bold mb-1">{user.name}</h2>
              <p className="text-gray-500 text-sm mb-4 capitalize">{user.role}</p>
              <div className="flex flex-col gap-2">
                <div className="px-4 py-2 bg-blue-50 rounded-lg">
                  <span className="text-blue-600 font-semibold text-sm">
                    {user.role === 'student' && '🎓 Student'}
                    {user.role === 'instructor' && '👨‍🏫 Instructor'}
                    {user.role === 'admin' && '👨‍💼 Administrator'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
              <h3 className="font-bold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                {user.role === 'student' && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Enrolled Courses</span>
                      <span className="font-bold text-blue-600">0</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Completed</span>
                      <span className="font-bold text-green-600">0</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Certificates</span>
                      <span className="font-bold text-purple-600">0</span>
                    </div>
                  </>
                )}
                {user.role === 'instructor' && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Courses Created</span>
                      <span className="font-bold text-blue-600">0</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Total Students</span>
                      <span className="font-bold text-green-600">0</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Total Lectures</span>
                      <span className="font-bold text-purple-600">0</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Personal Information</h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-blue-600 hover:text-purple-600 font-semibold text-sm transition"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false)
                        setFormData({ name: user.name, email: user.email })
                      }}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{user.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{user.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <p className="text-gray-900 font-medium capitalize">{user.role}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                  <p className="text-gray-900 font-medium">
                    {new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-6">Account Settings</h3>
              <div className="space-y-4">
                <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">Change Password</div>
                      <div className="text-sm text-gray-500">Update your password</div>
                    </div>
                    <span className="text-gray-400">→</span>
                  </div>
                </button>

                <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">Notification Preferences</div>
                      <div className="text-sm text-gray-500">Manage email and push notifications</div>
                    </div>
                    <span className="text-gray-400">→</span>
                  </div>
                </button>

                <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">Privacy Settings</div>
                      <div className="text-sm text-gray-500">Control your privacy preferences</div>
                    </div>
                    <span className="text-gray-400">→</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-red-200">
              <h3 className="text-xl font-bold text-red-600 mb-4">Danger Zone</h3>
              <div className="space-y-4">
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout from Account
                </button>

                <button className="w-full bg-white text-red-600 px-6 py-3 rounded-lg font-semibold border-2 border-red-600 hover:bg-red-50 transition">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

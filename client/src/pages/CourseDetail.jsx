import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { enrollInCourse, fetchCourse } from '../features/courses/courseSlice'
import { Link } from 'react-router-dom'

export default function CourseDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { current, loading, error } = useSelector((s) => s.courses)
  const { user, token } = useSelector((s)=> s.auth)

  useEffect(() => { dispatch(fetchCourse(id)) }, [dispatch, id])

  const enroll = async () => {
    if (!token) return navigate('/login')
    const res = await dispatch(enrollInCourse(id))
    if (res.meta.requestStatus === 'fulfilled') {
      // naive feedback; details can be refined later
      alert('Enrolled!')
    }
  }

  const isEnrolled = current?.students?.includes(user?.id);
  const canManage = user && (user.role === 'admin' || current?.instructor?._id === user.id);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
            <p className="text-lg text-gray-600">Loading course details...</p>
          </div>
        )}
        {error && (
          <div className="max-w-2xl mx-auto bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-xl shadow-lg">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}
        {current && (
          <div>
            {/* Course Header */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 md:p-12 text-white mb-8 shadow-2xl">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
                <div className="flex-1">
                  <div className="inline-block bg-white bg-opacity-20 px-4 py-1 rounded-full text-sm font-medium mb-4">
                    Course Details
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{current.title}</h1>
                  <p className="text-blue-100 text-lg mb-6 leading-relaxed">{current.description}</p>
                  <div className="flex flex-wrap items-center gap-6 text-sm">
                    <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                      <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                        👨‍🏫
                      </div>
                      <span className="font-medium">{current.instructor?.name || 'Unknown'}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                      <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                        👥
                      </div>
                      <span className="font-medium">{current.students?.length || 0} students enrolled</span>
                    </div>
                  </div>
                </div>
                {canManage && (
                  <Link
                    to={`/courses/${id}/manage`}
                    className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:shadow-2xl transition-all transform hover:scale-105 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Manage Course
                  </Link>
                )}
              </div>
              
              {!isEnrolled && user?.role === 'student' && (
                <button
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all transform hover:scale-105 flex items-center gap-3 text-lg"
                  onClick={enroll}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Enroll in this Course
                </button>
              )}
              {!token && (
                <Link
                  to="/login"
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all transform hover:scale-105 inline-flex items-center gap-3 text-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Login to Enroll
                </Link>
              )}
              {isEnrolled && (
                <div className="bg-green-500 bg-opacity-30 border-2 border-green-300 px-6 py-3 rounded-xl inline-flex items-center gap-2 font-semibold">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  You are enrolled in this course
                </div>
              )}
            </div>

            {/* Course Content Navigation */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Content</h2>
              <p className="text-gray-600 mb-6">Access all course materials and resources</p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link
                to={`/courses/${id}/lectures`}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-blue-500"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">Lectures</h3>
                  <p className="text-gray-600 text-sm mb-4">Watch video lectures and learn at your own pace</p>
                  <span className="text-blue-600 font-semibold group-hover:text-purple-600 transition-colors flex items-center gap-2">
                    Start Learning
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>

              <Link
                to={`/courses/${id}/assignments`}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-purple-500"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-purple-600 transition-colors">Assignments</h3>
                  <p className="text-gray-600 text-sm mb-4">Complete assignments and test your knowledge</p>
                  <span className="text-purple-600 font-semibold group-hover:text-pink-600 transition-colors flex items-center gap-2">
                    View Tasks
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>

              <Link
                to={`/courses/${id}/chat`}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-pink-500"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-pink-600 transition-colors">Chat</h3>
                  <p className="text-gray-600 text-sm mb-4">Discuss with peers and instructors</p>
                  <span className="text-pink-600 font-semibold group-hover:text-red-600 transition-colors flex items-center gap-2">
                    Join Discussion
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}



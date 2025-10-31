import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../lib/api'
import Layout from '../components/Layout'
import { FiDownload, FiUser, FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi'

export default function Submissions() {
  const { id: courseId, assignmentId } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchSubmissions()
  }, [courseId, assignmentId])

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/courses/${courseId}/assignments/${assignmentId}/submissions`)
      setData(response.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch submissions')
    } finally {
      setLoading(false)
    }
  }

  const handleViewFile = async (fileUrl, fileName) => {
    try {
      // First try to open the file directly
      const newWindow = window.open(fileUrl, '_blank')
      
      // If that fails (blocked by CORS/401), try the proxy endpoint
      if (!newWindow) {
        const encodedUrl = btoa(fileUrl) // Base64 encode the URL
        const proxyUrl = `/api/files/proxy/${encodedUrl}`
        window.open(proxyUrl, '_blank')
      }
    } catch (error) {
      console.error('Error opening file:', error)
      // Fallback: try to download the file
      const link = document.createElement('a')
      link.href = fileUrl
      link.download = fileName || 'submission'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const getFileIcon = (fileName) => {
    if (!fileName) return <FiDownload className="w-4 h-4" />
    const ext = fileName.split('.').pop()?.toLowerCase()
    if (ext === 'pdf') return <span className="text-red-600 font-bold text-xs">PDF</span>
    if (['jpg', 'jpeg', 'png'].includes(ext)) return <span className="text-green-600 font-bold text-xs">IMG</span>
    return <FiDownload className="w-4 h-4" />
  }

  if (loading) return <Layout><div className="text-center py-8">Loading submissions...</div></Layout>
  if (error) return <Layout><div className="text-red-600 text-center py-8">{error}</div></Layout>
  if (!data) return <Layout><div className="text-center py-8">No data found</div></Layout>

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link 
            to={`/courses/${courseId}/assignments`}
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← Back to Assignments
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{data.assignment?.title}</h1>
          <p className="text-gray-600 mt-2">{data.assignment?.description}</p>
          {data.assignment?.dueAt && (
            <p className="text-sm text-gray-500 mt-1">
              Due: {new Date(data.assignment.dueAt).toLocaleString()}
            </p>
          )}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center">
              <FiUser className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-blue-900">{data.enrolledStudents}</p>
                <p className="text-blue-700">Total Students</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center">
              <FiCheckCircle className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-green-900">{data.submittedCount}</p>
                <p className="text-green-700">Submitted</p>
              </div>
            </div>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <div className="flex items-center">
              <FiClock className="w-8 h-8 text-orange-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-orange-900">{data.notSubmittedStudents?.length || 0}</p>
                <p className="text-orange-700">Pending</p>
              </div>
            </div>
          </div>
        </div>

        {/* Submissions */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Submissions</h2>
          </div>
          
          {data.submissions?.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {data.submissions.map((submission) => (
                <div key={submission._id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">
                            {submission.student?.name?.charAt(0)?.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {submission.student?.name}
                        </h3>
                        <p className="text-sm text-gray-500">{submission.student?.email}</p>
                        <p className="text-xs text-gray-400">
                          Submitted: {new Date(submission.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      {submission.fileName && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          {getFileIcon(submission.fileName)}
                          <span>{submission.fileName}</span>
                        </div>
                      )}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewFile(submission.fileUrl, submission.fileName)}
                          className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1 text-sm"
                        >
                          <FiDownload className="w-4 h-4" />
                          <span>View</span>
                        </button>
                        <a
                          href={submission.fileUrl}
                          download={submission.fileName || 'submission'}
                          className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-1 text-sm"
                        >
                          <FiDownload className="w-4 h-4" />
                          <span>Download</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {submission.grade !== undefined && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700">
                        Grade: {submission.grade}/100
                      </p>
                      {submission.feedback && (
                        <p className="text-sm text-gray-600 mt-1">
                          Feedback: {submission.feedback}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              No submissions yet
            </div>
          )}
        </div>

        {/* Students who haven't submitted */}
        {data.notSubmittedStudents?.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <FiXCircle className="w-5 h-5 text-orange-500 mr-2" />
                Students Who Haven't Submitted ({data.notSubmittedStudents.length})
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.notSubmittedStudents.map((student) => (
                  <div key={student._id} className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-semibold text-sm">
                        {student.name?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { fetchAssignments, submitAssignment } from '../features/assignments/assignmentSlice'
import Layout from '../components/Layout'

export default function Assignments() {
  const { id } = useParams() // course id
  const dispatch = useDispatch()
  const { byCourseId, loading, error } = useSelector((s)=> s.assignments)
  const { user } = useSelector((s)=> s.auth)
  const assignments = byCourseId[id] || []
  const [selectedFile, setSelectedFile] = useState(null)
  const [submittingId, setSubmittingId] = useState(null)

  useEffect(()=>{ dispatch(fetchAssignments(id)) }, [dispatch, id])

  const handleSubmit = async (assignmentId) => {
    if (!selectedFile) return alert('Select a file')
    setSubmittingId(assignmentId)
    const res = await dispatch(submitAssignment({ courseId: id, assignmentId, file: selectedFile }))
    if (res.meta.requestStatus === 'fulfilled') {
      alert('Submitted!')
      setSelectedFile(null)
    }
    setSubmittingId(null)
  }

  return (
    <Layout>
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Assignments</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <ul className="space-y-4">
        {assignments.map(a => (
          <li key={a._id} className="border rounded p-4 bg-white">
            <h3 className="font-semibold">{a.title}</h3>
            <p className="text-sm text-slate-600 my-2">{a.description}</p>
            {a.dueAt && <p className="text-xs text-slate-500">Due: {new Date(a.dueAt).toLocaleString()}</p>}
            {user?.role === 'student' && (
              <div className="mt-3">
                <input type="file" onChange={(e)=>setSelectedFile(e.target.files[0])} className="mb-2" />
                <button 
                  className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
                  onClick={()=>handleSubmit(a._id)}
                  disabled={submittingId === a._id}
                >
                  {submittingId === a._id ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            )}
            {user?.role === 'instructor' && (
              <Link className="mt-3 inline-block text-blue-600 underline text-sm" to={`/courses/${id}/assignments/${a._id}/submissions`}>
                View Submissions
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
    </Layout>
  )
}


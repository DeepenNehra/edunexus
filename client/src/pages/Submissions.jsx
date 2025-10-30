import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchSubmissions } from '../features/assignments/assignmentSlice'
import Layout from '../components/Layout'

export default function Submissions() {
  const { id, assignmentId } = useParams()
  const dispatch = useDispatch()
  const { submissionsByAssignmentId, loading, error } = useSelector((s)=> s.assignments)
  const submissions = submissionsByAssignmentId[assignmentId] || []

  useEffect(()=>{ dispatch(fetchSubmissions({ courseId: id, assignmentId })) }, [dispatch, id, assignmentId])

  return (
    <Layout>
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Submissions</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <ul className="space-y-3">
        {submissions.map(s => (
          <li key={s._id} className="border rounded p-4 bg-white">
            <p className="font-semibold">{s.student?.name || 'Unknown'}</p>
            <p className="text-sm text-slate-600">{s.student?.email}</p>
            <a href={s.fileUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline text-sm">
              View Submission
            </a>
          </li>
        ))}
      </ul>
    </div>
    </Layout>
  )
}


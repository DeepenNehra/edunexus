import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { fetchLectures } from '../features/lectures/lectureSlice'
import Layout from '../components/Layout'

export default function Lectures() {
  const { id } = useParams() // course id
  const dispatch = useDispatch()
  const { byCourseId, loading, error } = useSelector((s)=> s.lectures)
  const lectures = byCourseId[id] || []

  useEffect(()=>{ dispatch(fetchLectures(id)) }, [dispatch, id])

  return (
    <Layout>
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Lectures</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <ul className="space-y-3">
        {lectures.map(l => (
          <li key={l._id} className="border rounded p-4 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{l.title}</h3>
                <p className="text-sm text-slate-600">{l.description}</p>
              </div>
              <Link className="text-blue-600 underline" to={`/courses/${id}/lectures/${l._id}`}>Play</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </Layout>
  )
}



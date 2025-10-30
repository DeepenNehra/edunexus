import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Layout from '../components/Layout'

export default function VideoPlayer() {
  const { id, lectureId } = useParams()
  const { byCourseId } = useSelector((s)=> s.lectures)
  const lecture = useMemo(()=> (byCourseId[id] || []).find(l=> l._id === lectureId), [byCourseId, id, lectureId])

  if (!lecture) return <Layout><div className="max-w-4xl mx-auto">Lecture not found. Open course lectures first.</div></Layout>

  return (
    <Layout>
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-2">{lecture.title}</h2>
      {lecture.description && <p className="mb-4 text-slate-700">{lecture.description}</p>}
      <video src={lecture.videoUrl} controls className="w-full border rounded" />
    </div>
    </Layout>
  )
}



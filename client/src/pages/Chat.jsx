import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { api } from '../lib/api'
import Layout from '../components/Layout'

export default function Chat() {
  const { id } = useParams() // course id
  const { user, token } = useSelector((s)=> s.auth)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const socketRef = useRef(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    // Fetch initial messages
    api.get(`/courses/${id}/chat`).then(({ data }) => setMessages(data.messages || []))

    // Setup socket
    const baseURL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'
    socketRef.current = io(baseURL, {
      auth: { token }
    })

    socketRef.current.emit('join-course', id)

    socketRef.current.on('new-message', (msg) => {
      setMessages(prev => [...prev, msg])
    })

    return () => {
      if (socketRef.current) socketRef.current.disconnect()
    }
  }, [id, token])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    if (!input.trim() || !socketRef.current || !user) return
    socketRef.current.emit('send-message', {
      courseId: id,
      senderId: user.id,
      message: input.trim()
    })
    setInput('')
  }

  return (
    <Layout>
    <div className="max-w-3xl mx-auto min-h-[600px] flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Course Chat</h2>
      <div className="flex-1 border rounded p-4 bg-white overflow-y-auto mb-4">
        {messages.map(m => (
          <div key={m._id} className="mb-3">
            <div className="text-xs text-slate-600">{m.sender?.name || 'Unknown'}</div>
            <div className="text-sm">{m.message}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2">
        <input 
          className="flex-1 border px-3 py-2 rounded" 
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          onKeyPress={(e)=>e.key==='Enter' && sendMessage()}
          placeholder="Type a message..."
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
    </Layout>
  )
}


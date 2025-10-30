import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../../lib/api'

export const fetchAssignments = createAsyncThunk('assignments/fetchByCourse', async (courseId, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`/courses/${courseId}/assignments`)
    return { courseId, assignments: data.assignments }
  } catch (err) {
    return rejectWithValue(err.response?.data || { error: 'Failed to load assignments' })
  }
})

export const submitAssignment = createAsyncThunk('assignments/submit', async ({ courseId, assignmentId, file }, { rejectWithValue }) => {
  try {
    const formData = new FormData()
    if (file) formData.append('file', file)
    const { data } = await api.post(`/courses/${courseId}/assignments/${assignmentId}/submit`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return data.submission
  } catch (err) {
    return rejectWithValue(err.response?.data || { error: 'Submission failed' })
  }
})

export const fetchSubmissions = createAsyncThunk('assignments/fetchSubmissions', async ({ courseId, assignmentId }, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`/courses/${courseId}/assignments/${assignmentId}/submissions`)
    return { assignmentId, submissions: data.submissions }
  } catch (err) {
    return rejectWithValue(err.response?.data || { error: 'Failed to load submissions' })
  }
})

const assignmentSlice = createSlice({
  name: 'assignments',
  initialState: {
    byCourseId: {},
    submissionsByAssignmentId: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignments.pending, (s)=>{ s.loading = true; s.error = null })
      .addCase(fetchAssignments.fulfilled, (s, a)=>{ s.loading = false; s.byCourseId[a.payload.courseId] = a.payload.assignments })
      .addCase(fetchAssignments.rejected, (s, a)=>{ s.loading = false; s.error = a.payload?.error || 'Failed' })
      
      .addCase(submitAssignment.pending, (s)=>{ s.loading = true })
      .addCase(submitAssignment.fulfilled, (s)=>{ s.loading = false })
      .addCase(submitAssignment.rejected, (s, a)=>{ s.loading = false; s.error = a.payload?.error || 'Failed' })
      
      .addCase(fetchSubmissions.pending, (s)=>{ s.loading = true })
      .addCase(fetchSubmissions.fulfilled, (s, a)=>{ s.loading = false; s.submissionsByAssignmentId[a.payload.assignmentId] = a.payload.submissions })
      .addCase(fetchSubmissions.rejected, (s, a)=>{ s.loading = false; s.error = a.payload?.error || 'Failed' })
  }
})

export default assignmentSlice.reducer


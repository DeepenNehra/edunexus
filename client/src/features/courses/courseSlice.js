import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../../lib/api'

export const fetchCourses = createAsyncThunk('courses/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/courses')
    return data.courses
  } catch (err) {
    return rejectWithValue(err.response?.data || { error: 'Failed to load courses' })
  }
})

export const fetchCourse = createAsyncThunk('courses/fetchOne', async (id, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`/courses/${id}`)
    return data.course
  } catch (err) {
    return rejectWithValue(err.response?.data || { error: 'Failed to load course' })
  }
})

export const enrollInCourse = createAsyncThunk('courses/enroll', async (id, { rejectWithValue }) => {
  try {
    const { data } = await api.post(`/courses/${id}/enroll`)
    return { id, enrolled: data.enrolled }
  } catch (err) {
    return rejectWithValue(err.response?.data || { error: 'Enroll failed' })
  }
})

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    items: [],
    current: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (s)=>{ s.loading = true; s.error = null })
      .addCase(fetchCourses.fulfilled, (s, a)=>{ s.loading = false; s.items = a.payload })
      .addCase(fetchCourses.rejected, (s, a)=>{ s.loading = false; s.error = a.payload?.error || 'Failed' })

      .addCase(fetchCourse.pending, (s)=>{ s.loading = true; s.error = null; s.current = null })
      .addCase(fetchCourse.fulfilled, (s, a)=>{ s.loading = false; s.current = a.payload })
      .addCase(fetchCourse.rejected, (s, a)=>{ s.loading = false; s.error = a.payload?.error || 'Failed' })

      .addCase(enrollInCourse.pending, (s)=>{ s.loading = true })
      .addCase(enrollInCourse.fulfilled, (s)=>{ s.loading = false })
      .addCase(enrollInCourse.rejected, (s, a)=>{ s.loading = false; s.error = a.payload?.error || 'Failed' })
  }
})

export default courseSlice.reducer



import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../../lib/api'

export const fetchLectures = createAsyncThunk('lectures/fetchByCourse', async (courseId, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`/courses/${courseId}/lectures`)
    return { courseId, lectures: data.lectures }
  } catch (err) {
    return rejectWithValue(err.response?.data || { error: 'Failed to load lectures' })
  }
})

const lecturesSlice = createSlice({
  name: 'lectures',
  initialState: {
    byCourseId: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLectures.pending, (s)=>{ s.loading = true; s.error = null })
      .addCase(fetchLectures.fulfilled, (s, a)=>{ s.loading = false; s.byCourseId[a.payload.courseId] = a.payload.lectures })
      .addCase(fetchLectures.rejected, (s, a)=>{ s.loading = false; s.error = a.payload?.error || 'Failed' })
  }
})

export default lecturesSlice.reducer



import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api, setAuthToken } from '../../lib/api'

const saved = JSON.parse(localStorage.getItem('auth') || 'null')
if (saved?.token) setAuthToken(saved.token)

export const signup = createAsyncThunk('auth/signup', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/signup', payload)
    return data
  } catch (err) {
    return rejectWithValue(err.response?.data || { error: 'Signup failed' })
  }
})

export const login = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/login', payload)
    return data
  } catch (err) {
    return rejectWithValue(err.response?.data || { error: 'Login failed' })
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: saved?.user || null,
    token: saved?.token || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null
      state.token = null
      localStorage.removeItem('auth')
      setAuthToken(null)
    },
    setCredentials(state, action) {
      state.user = action.payload.user
      state.token = action.payload.token
      localStorage.setItem('auth', JSON.stringify({ user: state.user, token: state.token }))
      setAuthToken(state.token)
    },
  },
  extraReducers: (builder) => {
    const fulfilled = (state, action) => {
      state.loading = false
      state.error = null
      state.user = action.payload.user
      state.token = action.payload.token
      localStorage.setItem('auth', JSON.stringify({ user: state.user, token: state.token }))
      setAuthToken(state.token)
    }
    const pending = (state) => {
      state.loading = true
      state.error = null
    }
    const rejected = (state, action) => {
      state.loading = false
      state.error = action.payload?.error || 'Request failed'
    }
    builder
      .addCase(signup.pending, pending)
      .addCase(signup.fulfilled, fulfilled)
      .addCase(signup.rejected, rejected)
      .addCase(login.pending, pending)
      .addCase(login.fulfilled, fulfilled)
      .addCase(login.rejected, rejected)
  },
})

export const { logout, setCredentials } = authSlice.actions
export default authSlice.reducer



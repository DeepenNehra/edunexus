import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../lib/api';

export const fetchStatistics = createAsyncThunk('admin/fetchStatistics', async () => {
  const { data } = await api.get('/admin/statistics');
  return data.statistics;
});

export const fetchUsers = createAsyncThunk('admin/fetchUsers', async () => {
  const { data } = await api.get('/admin/users');
  return data.users;
});

export const updateUser = createAsyncThunk('admin/updateUser', async ({ id, updates }) => {
  const { data } = await api.put(`/admin/users/${id}`, updates);
  return data.user;
});

export const deleteUser = createAsyncThunk('admin/deleteUser', async (id) => {
  await api.delete(`/admin/users/${id}`);
  return id;
});

export const deleteContent = createAsyncThunk('admin/deleteContent', async ({ type, id }) => {
  await api.delete(`/admin/content/${type}/${id}`);
  return { type, id };
});

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    statistics: null,
    users: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.statistics = action.payload;
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(u => u._id === action.payload._id);
        if (index !== -1) state.users[index] = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(u => u._id !== action.payload);
      });
  }
});

export default adminSlice.reducer;

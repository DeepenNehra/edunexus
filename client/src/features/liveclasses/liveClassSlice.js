import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../lib/api';

export const fetchLiveClasses = createAsyncThunk('liveClasses/fetch', async (courseId) => {
  const { data } = await api.get(`/courses/${courseId}/liveclasses`);
  return { courseId, classes: data.classes };
});

export const createLiveClass = createAsyncThunk('liveClasses/create', async ({ courseId, classData }) => {
  const { data } = await api.post(`/courses/${courseId}/liveclasses`, classData);
  return { courseId, liveClass: data.liveClass };
});

export const updateLiveClass = createAsyncThunk('liveClasses/update', async ({ courseId, id, updates }) => {
  const { data } = await api.put(`/courses/${courseId}/liveclasses/${id}`, updates);
  return { courseId, liveClass: data.liveClass };
});

export const deleteLiveClass = createAsyncThunk('liveClasses/delete', async ({ courseId, id }) => {
  await api.delete(`/courses/${courseId}/liveclasses/${id}`);
  return { courseId, id };
});

export const joinLiveClass = createAsyncThunk('liveClasses/join', async ({ courseId, id }) => {
  const { data } = await api.post(`/courses/${courseId}/liveclasses/${id}/join`);
  return { courseId, liveClass: data.liveClass };
});

const liveClassSlice = createSlice({
  name: 'liveClasses',
  initialState: {
    byCourseId: {},
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLiveClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLiveClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.byCourseId[action.payload.courseId] = action.payload.classes;
      })
      .addCase(fetchLiveClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createLiveClass.fulfilled, (state, action) => {
        const { courseId, liveClass } = action.payload;
        if (!state.byCourseId[courseId]) state.byCourseId[courseId] = [];
        state.byCourseId[courseId].push(liveClass);
      })
      .addCase(updateLiveClass.fulfilled, (state, action) => {
        const { courseId, liveClass } = action.payload;
        const classes = state.byCourseId[courseId] || [];
        const index = classes.findIndex(c => c._id === liveClass._id);
        if (index !== -1) classes[index] = liveClass;
      })
      .addCase(deleteLiveClass.fulfilled, (state, action) => {
        const { courseId, id } = action.payload;
        if (state.byCourseId[courseId]) {
          state.byCourseId[courseId] = state.byCourseId[courseId].filter(c => c._id !== id);
        }
      });
  }
});

export default liveClassSlice.reducer;

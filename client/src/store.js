import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import coursesReducer from './features/courses/courseSlice'
import lecturesReducer from './features/lectures/lectureSlice'
import assignmentsReducer from './features/assignments/assignmentSlice'
import adminReducer from './features/admin/adminSlice'
import liveClassesReducer from './features/liveclasses/liveClassSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
    lectures: lecturesReducer,
    assignments: assignmentsReducer,
    admin: adminReducer,
    liveClasses: liveClassesReducer,
  },
})



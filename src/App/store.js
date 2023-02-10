import employeeReducer from '../Features/employee.slice'
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    employee: employeeReducer,
  },
})

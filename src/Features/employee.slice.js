import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  employeesList: [],
}

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    create: (state, action) => void({
      ...state,
      employeesList: state.employeesList.push(
        {
          firstname: action.payload[0],
          lastname: action.payload[1],
          startDate: action.payload[2],
          department: action.payload[3],
          birthDate: action.payload[4],
          streetAddress: action.payload[5],
          cityAddress: action.payload[6],
          stateAddress: action.payload[7],
          zipCodeAddresse: action.payload[8],
        })
    }),
  },
})

export const { create } = employeeSlice.actions

export default employeeSlice.reducer

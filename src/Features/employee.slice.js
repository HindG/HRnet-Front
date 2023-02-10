import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  lastname: "",
  firstname: "",
  birthDate: "",
  startDate: "",
  streetAddress: "",
  cityAddress: "",
  stateAddress: "",
  zipCodeAddresse: 0,
  department: "",
}

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    create: (state, action) => ({
      ...state,
      lastname: action.payload[0],
      firstname: action.payload[1],
      birthDate: action.payload[2],
      startDate: action.payload[3],
      streetAddress: action.payload[4],
      cityAddress: action.payload[5],
      stateAddress: action.payload[6],
      zipCodeAddresse: action.payload[7],
      department: action.payload[8],
    }),
  },
})

export const { create } = employeeSlice.actions

export default employeeSlice.reducer

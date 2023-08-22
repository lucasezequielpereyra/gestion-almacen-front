import { createSlice } from '@reduxjs/toolkit'

const employeesSlice = createSlice({
  name: 'employees',
  initialState: { employees: [], inactiveEmployees: [] },
  reducers: {
    getEmployees: (state, action) => {
      const { foundEmployees } = action.payload
      state.employees = foundEmployees
    },
    getInactiveEmployees: (state, action) => {
      const { foundEmployees } = action.payload
      state.inactiveEmployees = foundEmployees
    },
    activeEmployees: (state, action) => {
      const { activeEmployee } = action.payload
      state.inactiveEmployees = state.inactiveEmployees.filter(
        employee => employee._id !== activeEmployee._id
      )
      state.employees = [...state.employees, activeEmployee]
    },
    newInternalEmployee: (state, action) => {
      const { savedEmployee } = action.payload
      state.employees = [...state.employees, savedEmployee]
    },
    updateInternalEmployee: (state, action) => {
      const { updatedEmployee } = action.payload
      state.employees = state.employees.map(employee => {
        if (employee._id === updatedEmployee._id) {
          return updatedEmployee
        }
        return employee
      })
    },
    deleteInternalEmployee: (state, action) => {
      const { deletedEmployee } = action.payload
      state.employees = state.employees.filter(employee => employee._id !== deletedEmployee._id)
      state.inactiveEmployees = [...state.inactiveEmployees, deletedEmployee]
    }
  }
})

export const {
  getEmployees,
  getInactiveEmployees,
  activeEmployees,
  newInternalEmployee,
  deleteInternalEmployee,
  updateInternalEmployee
} = employeesSlice.actions

export default employeesSlice.reducer

export const selectCurrentEmployees = state => state.employees.employees
export const selectInactiveEmployees = state => state.employees.inactiveEmployees

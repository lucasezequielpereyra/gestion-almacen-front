import { apiSlice } from '../api/apiSlice'

const employeesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getEmployees: builder.query({
      query: () => '/api/owner/employees'
    })
  })
})

const inactiveEmployeesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getInactiveEmployees: builder.query({
      query: () => '/api/owner/employees/inactive'
    })
  })
})

const newEmployeeApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    newEmployee: builder.mutation({
      query: employee => ({
        url: '/api/owner/employees',
        method: 'POST',
        body: { ...employee }
      })
    })
  })
})

const updateEmployeeApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    updateEmployee: builder.mutation({
      query: employee => ({
        url: `/api/owner/employees`,
        method: 'PUT',
        body: { ...employee }
      })
    })
  })
})

const deleteEmployeeApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    deleteEmployee: builder.mutation({
      query: employeeId => ({
        url: `/api/owner/employees`,
        method: 'DELETE',
        body: { employeeId }
      })
    })
  })
})

const activeEmployeeApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    activeEmployee: builder.mutation({
      query: employeeId => ({
        url: `/api/owner/employees/active`,
        method: 'PUT',
        body: { employeeId }
      })
    })
  })
})

export const { useGetEmployeesQuery } = employeesApiSlice
export const { useGetInactiveEmployeesQuery } = inactiveEmployeesApiSlice
export const { useNewEmployeeMutation } = newEmployeeApiSlice
export const { useUpdateEmployeeMutation } = updateEmployeeApiSlice
export const { useDeleteEmployeeMutation } = deleteEmployeeApiSlice
export const { useActiveEmployeeMutation } = activeEmployeeApiSlice

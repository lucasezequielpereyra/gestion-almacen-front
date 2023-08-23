import { apiSlice } from '../api/apiSlice'

const employeesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getEmployees: builder.query({
      query: () => '/api/owner/employees'
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
        url: `/api/owner/employees/${employee.id}`,
        method: 'PUT',
        body: { ...employee }
      })
    })
  })
})

const deleteEmployeeApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    deleteEmployee: builder.mutation({
      query: id => ({
        url: `/api/owner/employees/${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const { useGetEmployeesQuery } = employeesApiSlice
export const { useNewEmployeeMutation } = newEmployeeApiSlice
export const { useUpdateEmployeeMutation } = updateEmployeeApiSlice
export const { useDeleteEmployeeMutation } = deleteEmployeeApiSlice

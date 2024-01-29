import { createSlice } from "@reduxjs/toolkit"
import { getDeleteRequests, getUsers } from "../actions/AdminAction"
import { Request, User } from "@/types"

interface UserState {
  totalUser: number
  totalPages: number
  users: User[]
  requests: Request[]
}
const initialState: UserState = {
  totalUser: 0,
  totalPages: 0,
  users: [],
  requests: [],
}

export const slice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      const usersPerPage = 8
      const totalUsers = action.payload.data.data.totalUser
      state.totalUser = totalUsers
      state.totalPages = Math.ceil(Number(totalUsers) / usersPerPage)
      const temporary_array: User[] = []
      action.payload.data.data?.users?.map((item: any) => {
        if (!item.isValidator && !item.isBeneficiary) {
          const date = new Date(item?.createdAt?._seconds * 1000)
          const dateString = date.toDateString()
          temporary_array.push({
            email: item.email || "example@example.com",
            displayName: item.displayName || "Username not Set",
            id: item.uid,
            profile_image: item.profile_image,
            joining_date: dateString,
            plan: item.plan || "Plan not Selected",
            payment_status: item.paymentStatus || "Status not found",
            account_status: item.accountStatus || "Status not found",
            pulse_status: item.pulseCheckActive,
          })
        }
      })
      state.users = temporary_array
    }),
    builder.addCase(getDeleteRequests.fulfilled, (state, action) => {
      state.requests = action.payload.data.data
    })
  },
})

export default slice.reducer

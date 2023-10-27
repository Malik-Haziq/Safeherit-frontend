import { createSlice } from "@reduxjs/toolkit"
import { getUsers } from "../actions/AdminAction"
import { User } from "@/types"

interface UserState {
  totalUser: number
  totalPages: number
  users: User[]
}
const initialState: UserState = {
  totalUser: 0,
  totalPages: 0,
  users: []
}

export const slice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    updateName: (state, action) => {
    },
  },
  extraReducers(builder) {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      const usersPerPage = 8
      const totalUsers = action.payload.data.data.totalUser
      state.totalUser = totalUsers
      state.totalPages = Math.ceil(Number(totalUsers) / usersPerPage);
      const temporary_array: User[] = []
      action.payload.data.data?.users?.map((item: any) => {
        if (!item.isValidator && !item.isBeneficiary) {
          let date = new Date(item?.createdAt?._seconds * 1000)
          let dateString = date.toDateString()
          temporary_array.push({
            email: item.email || "example@example.com",
            name: item.displayName || "Username not Set",
            id: item.uid,
            image: item.image,
            joining_date: dateString,
            plan: item.plan || "Plan not Selected",
            payment_status: item.paymentStatus || "Status not found",
            account_status: item.accountStatus || "Status not found",
            pulse_status: item.pulseCheckActive
          })
        }
      })
      state.users = temporary_array
    })
  },
})

export const { updateName } = slice.actions

export default slice.reducer

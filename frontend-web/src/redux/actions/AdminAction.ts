import { createAsyncThunk } from "@reduxjs/toolkit"
import { GET, PUT, GET_USERS, DELETE_USER_REQUEST, DELETE_USER, DELETE } from "@/common"

export const getUsers = createAsyncThunk(
  "getUsers",
  async (Data: { page: number }, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: { token: any } }
    const params = {
      ROUTE: `${GET_USERS}?page=${Data.page}&pageSize=8`,
      Body: {},
      token: user.token,
    }
    try {
      const response = await GET(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

// export const updateUser = createAsyncThunk(
//   "updateUser",
//   async (Data: {}, { getState, rejectWithValue }) => {
//     const { user } = getState() as { user: {token: any} };
//     let formData = jsonToFormData(Data)
//     const params = { ROUTE: GET_USER, Body: formData, token: user.token  }
//     try {
//       let response = await PUT(params)
//       return response
//     } catch (error) {
//       return rejectWithValue(error)
//     }
//   },
// )

export const deleteUserRequest = createAsyncThunk(
  "deleteUserRequest",
  async (Data: object, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: { token: any } }
    const params = { ROUTE: DELETE_USER_REQUEST, Body: Data, token: user.token }
    try {
      const response = await PUT(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)
export const deleteUserFromSuperadmin = createAsyncThunk(
  "deleteUser",
  async (Data: {email: string}, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: { token: any } }
    const params = { ROUTE: `${DELETE_USER}?userEmailToDelete=${Data?.email}`, token: user.token }
    try {
      const response = await DELETE(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

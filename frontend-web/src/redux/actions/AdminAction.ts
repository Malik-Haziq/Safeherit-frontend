import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  GET,
  PUT,
  POST,
  GET_USERS,
  DELETE_USER_REQUEST,
  DELETE_USER,
  DELETE,
  USER_ACCOUNT_STATUS,
  SUPER_ADMIN_DELETE_REQUESTS,
  ADMIN_DELETE_REQUEST,
  APPROVE_DELETION_REQUEST,
  REJECT_DELETION_REQUEST,
  RE_ADD_DELETION_REQUEST,
  OFFER_FREE_TRIAL,
  jsonToFormData,
  ADMIN_UPDATE_PULSE_CHECK,
} from "@/common"
import { setLoaderVisibility } from "../reducers/LoaderSlice"

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

export const changeUserAccountStatus = createAsyncThunk(
  "changeUserAccountStatus",
  async (Data: object, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: { token: any } }
    const params = { ROUTE: USER_ACCOUNT_STATUS, Body: Data, token: user.token }
    try {
      const response = await PUT(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const getDeleteRequests = createAsyncThunk(
  "getDeleteRequests",
  async (
    Data: { role: string; page: number },
    { getState, rejectWithValue },
  ) => {
    const { user } = getState() as { user: { token: any } }
    const params = {
      ROUTE: `${
        Data.role === "admin"
          ? ADMIN_DELETE_REQUEST
          : SUPER_ADMIN_DELETE_REQUESTS
      }`,
      // /?page=${Data.page}&pageSize=8
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

export const deleteUserFromSuperadmin = createAsyncThunk(
  "deleteUser",
  async (Data: { email: string }, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: { token: any } }
    const params = {
      ROUTE: `${DELETE_USER}?userEmailToDelete=${Data?.email}`,
      token: user.token,
    }
    try {
      const response = await DELETE(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)
export const updateDeleteRequest = createAsyncThunk(
  "updateDeleteRequest",
  async (
    Data: { id: string; action: string },
    { getState, rejectWithValue },
  ) => {
    const { user } = getState() as { user: { token: any } }
    const params = {
      ROUTE: `${
        Data.action === "Approve"
          ? APPROVE_DELETION_REQUEST
          : REJECT_DELETION_REQUEST
      }`,
      Body: { id: Data.id },
      token: user.token,
    }
    try {
      const response = await PUT(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)
export const reAddDeleteRequest = createAsyncThunk(
  "reAddDeleteRequest",
  async (Data: { id: string }, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: { token: any } }
    const params = {
      ROUTE: `${RE_ADD_DELETION_REQUEST}?id=${Data.id}`,
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

export const offerTrial = createAsyncThunk(
  "offerTrial",
  async (
    Data: { email: string; tillDate: string; reason: string },
    { dispatch, rejectWithValue },
  ) => {
    dispatch(setLoaderVisibility(true))
    const formData = jsonToFormData(Data)
    const params = {
      ROUTE: OFFER_FREE_TRIAL,
      Body: formData,
    }
    try {
      const response = await POST(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    } finally {
      dispatch(setLoaderVisibility(false))
    }
  },
)

export const adminUpdatePulseCheck = createAsyncThunk(
  "adminUpdatePulseCheck",
  async (Data: object, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: { token: any } }
    const params = {
      ROUTE: ADMIN_UPDATE_PULSE_CHECK,
      Body: Data,
      token: user.token,
    }
    try {
      const response = await PUT(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

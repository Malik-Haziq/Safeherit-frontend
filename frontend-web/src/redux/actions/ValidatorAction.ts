import { DELETE, GET, POST, PUT, jsonToFormData, ALL_VALIDATORS, VALIDATORS, OWNER_VALIDATION } from "@/common"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getAllValidator = createAsyncThunk(
  "getAllValidator",
  async (Data: {}, {getState, rejectWithValue }) => {
    const { user } = getState() as { user: {token: any} };
    const params = { ROUTE: ALL_VALIDATORS, Body: {}, token: user.token }
    try {
      let response = await GET(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const createValidator = createAsyncThunk(
  "createValidator",
  async (Data: {}, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: {token: any} };
    let formData = jsonToFormData(Data)
    const params = { ROUTE: VALIDATORS, Body: formData, token: user.token  }
    try {
      let response = await POST(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const findValidator = createAsyncThunk(
  "findValidator",
  async (Data: {id: string}, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: {token: any} };
    const params = { ROUTE: `${VALIDATORS}?id=${Data.id}`, Body: {}, token: user.token  }
    try {
      let response = await GET(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const updateValidator = createAsyncThunk(
  "updateValidator",
  async (Data: {}, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: {token: any} };
    let formData = jsonToFormData(Data)
    const params = { ROUTE: VALIDATORS, Body: formData, token: user.token  }
    try {
      let response = await PUT(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const deleteValidator = createAsyncThunk(
  "deleteValidator",
  async (Data: {id: string}, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: {token: any} };
    const params = { ROUTE: `${VALIDATORS}?id=${Data.id}`, Body: {}, token: user.token  }
    try {
      let response = await DELETE(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const getOwnerValidation = createAsyncThunk(
  "getOwnerValidation",
  async (Data: {}, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: {token: any, selectedRoleUser: {ownerEmail: "",validatorId: "", ownerName: ""}} };
    const owner_email = user.selectedRoleUser?.ownerEmail
    const validator_id = user.selectedRoleUser?.validatorId
    const params = { ROUTE: `${OWNER_VALIDATION}?owner_email=${owner_email}&validator_id=${validator_id}`, Body: {}, token: user.token  }
    try {
      let response = await GET(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)
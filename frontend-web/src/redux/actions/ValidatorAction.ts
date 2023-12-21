import {
  DELETE,
  GET,
  POST,
  PUT,
  jsonToFormData,
  ALL_VALIDATORS,
  VALIDATORS,
  VALIDATION,
} from "@/common"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getAllValidator = createAsyncThunk(
  "getAllValidator",
  async (Data: object, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: { token: any } }
    const params = { ROUTE: ALL_VALIDATORS, Body: {}, token: user.token }
    try {
      const response = await GET(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const createValidator = createAsyncThunk(
  "createValidator",
  async (Data: object, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: { token: any } }
    const formData = jsonToFormData(Data)
    const params = { ROUTE: VALIDATORS, Body: formData, token: user.token }
    try {
      const response = await POST(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const findValidator = createAsyncThunk(
  "findValidator",
  async (Data: { id: string }, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: { token: any } }
    const params = {
      ROUTE: `${VALIDATORS}?id=${Data.id}`,
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

export const updateValidator = createAsyncThunk(
  "updateValidator",
  async (Data: object, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: { token: any } }
    const formData = jsonToFormData(Data)
    const params = { ROUTE: VALIDATORS, Body: formData, token: user.token }
    try {
      const response = await PUT(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const deleteValidator = createAsyncThunk(
  "deleteValidator",
  async (Data: { id: string }, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: { token: any } }
    const params = {
      ROUTE: `${VALIDATORS}?id=${Data.id}`,
      Body: {},
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

export const getOwnerValidation = createAsyncThunk(
  "getOwnerValidation",
  async (Data: object, { getState, rejectWithValue }) => {
    const { user } = getState() as {
      user: {
        token: any
        selectedRoleUser: { ownerEmail: ""; validatorId: ""; ownerName: "" }
      }
    }
    const owner_email = user.selectedRoleUser?.ownerEmail
    const validator_id = user.selectedRoleUser?.validatorId
    const params = {
      ROUTE: `${VALIDATION}?owner_email=${owner_email}&validator_id=${validator_id}`,
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

export const validateOwner = createAsyncThunk(
  "validateOwner",
  async (Data: object, { getState, rejectWithValue }) => {
    const { user } = getState() as {
      user: {
        token: any
        selectedRoleUser: { ownerEmail: ""; validatorId: ""; ownerName: "" }
      }
    }
    const owner_email = user.selectedRoleUser?.ownerEmail
    const validator_id = user.selectedRoleUser?.validatorId
    const data = {
      ...Data,
      owner_email,
      validator_id,
    }
    const formData = jsonToFormData(data)
    const params = { ROUTE: VALIDATION, Body: formData, token: user.token }
    try {
      const response = await PUT(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

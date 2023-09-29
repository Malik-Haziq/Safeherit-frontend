import { DELETE, GET, POST, PUT, jsonToFormData } from "../../common"
import { ALL_ASSETS, ASSETS } from "../../common/api/routes"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getAllAsset = createAsyncThunk(
  "getAllAsset",
  async (Data: {}, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: {token: ""} };
    const params = { ROUTE: ALL_ASSETS, Body: {}, token: user.token }
    try {
      let response = await GET(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const createAsset = createAsyncThunk(
  "createAsset",
  async (Data: {}, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: {token: ""} };
    const formData = jsonToFormData(Data)
    const params = { ROUTE: ASSETS, Body: formData, token: user.token }
    try {
      let response = await POST(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const findAsset = createAsyncThunk(
  "findAsset",
  async (Data: {id: string}, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: {token: ""} };
    const params = { ROUTE: `${ASSETS}?id=${Data.id}`, Body: {}, token: user.token }
    try {
      let response = await GET(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const updateAsset = createAsyncThunk(
  "updateAsset",
  async (Data: {}, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: {token: ""} };
    const formData = jsonToFormData(Data)
    const params = { ROUTE: ASSETS, Body: formData, token: user.token }
    try {
      let response = await PUT(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const deleteAsset = createAsyncThunk(
  "deleteAsset",
  async (Data: {id: string}, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: {token: ""} };
    const params = { ROUTE: `${ASSETS}?id=${Data.id}`, Body: {}, token: user.token }
    try {
      let response = await DELETE(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

import { DELETE, GET, POST, PUT, jsonToFormData } from "../../common"
import { ALL_BENEFICIARIES, BENEFICIARIES } from "../../common/api/routes"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getAllBeneficiary = createAsyncThunk(
  "getAllBeneficiary",
  async (Data: {}, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: {token: ""} };
    const params = { ROUTE: ALL_BENEFICIARIES, Body: {}, token: user.token }
    try {
      let response = await GET(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const createBeneficiary = createAsyncThunk(
  "createBeneficiary",
  async (Data: {}, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: {token: ""} };
    const formData = jsonToFormData(Data)
    const params = { ROUTE: BENEFICIARIES, Body: formData, token: user.token }
    try {
      let response = await POST(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const findBeneficiary = createAsyncThunk(
  "findBeneficiary",
  async (Data: {id: string}, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: {token: ""} };
    const params = { ROUTE: `${BENEFICIARIES}?id=${Data.id}`, Body: {}, token: user.token }
    try {
      let response = await GET(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const updateBeneficiary = createAsyncThunk(
  "updateBeneficiary",
  async (Data: {}, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: {token: ""} };
    const formData = jsonToFormData(Data)
    const params = { ROUTE: BENEFICIARIES, Body: formData, token: user.token }
    try {
      let response = await PUT(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const deleteBeneficiary = createAsyncThunk(
  "deleteBeneficiary",
  async (Data: {id: string}, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: {token: ""} };
    const params = { ROUTE: `${BENEFICIARIES}?id=${Data.id}`, Body: {}, token: user.token }
    try {
      let response = await DELETE(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

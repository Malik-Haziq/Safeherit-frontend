import { DELETE, GET, POST, PUT, jsonToFormData, ALL_BENEFICIARIES, BENEFICIARIES, TESTMENTS } from "@/common"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getAllBeneficiary = createAsyncThunk(
  "getAllBeneficiary",
  async (Data: object, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: {token: ""} };
    const params = { ROUTE: ALL_BENEFICIARIES, Body: {}, token: user.token }
    try {
      const response = await GET(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const createBeneficiary = createAsyncThunk(
  "createBeneficiary",
  async (Data: object, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: {token: ""} };
    const formData = jsonToFormData(Data)
    const params = { ROUTE: BENEFICIARIES, Body: formData, token: user.token }
    try {
      const response = await POST(params)
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
      const response = await GET(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const updateBeneficiary = createAsyncThunk(
  "updateBeneficiary",
  async (Data: object, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: {token: ""} };
    const formData = jsonToFormData(Data)
    const params = { ROUTE: BENEFICIARIES, Body: formData, token: user.token }
    try {
      const response = await PUT(params)
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
      const response = await DELETE(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const findTestment = createAsyncThunk(
  "findTestment",
  async (Data: object, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: {token: "", selectedRoleUser: {ownerEmail: "",beneficiaryId: "", ownerName: ""}} };
    const owner_email = user.selectedRoleUser?.ownerEmail
    const beneficiary_id = user.selectedRoleUser?.beneficiaryId
    const params = { ROUTE: `${TESTMENTS}?owner_email=${owner_email}&beneficiary_id=${beneficiary_id}`, Body: {}, token: user.token }
    try {
      const response = await GET(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

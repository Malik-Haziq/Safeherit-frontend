import { GET, POST } from "../../common"
import { ALL_VALIDATORS, VALIDATORS } from "../../common/api/routes"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getAllValidator = createAsyncThunk(
  "getAllValidator",
  async (Data: {}, { rejectWithValue }) => {
    const params = { ROUTE: ALL_VALIDATORS, Body: {} }
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
    const params = { ROUTE: VALIDATORS, Body: JSON.stringify({ ...Data }) }
    try {
      let response = await POST(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

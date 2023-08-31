import { GET } from "../../common"
import { ALL_VALIDATORS } from "../../common/api/routes";
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getAllValidator = createAsyncThunk(
  "getAllValidator",
  async (Data: {}, { rejectWithValue }) => {
    const params = {ROUTE: ALL_VALIDATORS, Body: {}}
    try {
      let response = await GET(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

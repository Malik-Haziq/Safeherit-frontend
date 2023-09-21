import { GET, } from "../../common"
import { GET_DATA } from "../../common/api/routes"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getData = createAsyncThunk(
  "getData",
  async (Data: {}, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: {token: ""} };
    const params = { ROUTE: GET_DATA, Body: {}, token: user.token }
    try {
      let response = await GET(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)
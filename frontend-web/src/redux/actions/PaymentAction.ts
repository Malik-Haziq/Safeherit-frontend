import { createAsyncThunk } from "@reduxjs/toolkit"
import { GET, GET_PAYMENT_HISTORY, GET_PAYMENT_METHODS } from "@/common"
import { setLoaderVisibility } from "../reducers/LoaderSlice"

export const fetchCreditCards = createAsyncThunk(
  "payment/fetchCreditCards",
  async (Data: object, { dispatch, rejectWithValue }) => {
    const params = { ROUTE: GET_PAYMENT_METHODS, Body: {} }
    dispatch(setLoaderVisibility(true))
    try {
      const response = await GET(params)
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    } finally {
      dispatch(setLoaderVisibility(false))
    }
  },
)

export const fetchBillingHistory = createAsyncThunk(
  "payment/fetchBillingHistory",
  async (Data: object, { dispatch, rejectWithValue }) => {
    const params = { ROUTE: GET_PAYMENT_HISTORY, Body: {} }
    dispatch(setLoaderVisibility(true))
    try {
      const response = await GET(params)
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    } finally {
      dispatch(setLoaderVisibility(false))
    }
  },
)

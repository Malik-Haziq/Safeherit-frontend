import { createSlice } from "@reduxjs/toolkit"
import { fetchBillingHistory, fetchCreditCards } from "../actions/PaymentAction"

interface PaymentState {
  billingHistory: any[]
  creditCards: any[]
  loading: boolean
  error: string | null
}

const initialState: PaymentState = {
  billingHistory: [],
  creditCards: [],
  loading: false,
  error: null,
}

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBillingHistory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBillingHistory.fulfilled, (state, action) => {
        state.billingHistory = action.payload.data.billingHistory || []
        state.loading = false
      })
      .addCase(fetchBillingHistory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchCreditCards.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCreditCards.fulfilled, (state, action) => {
        state.creditCards = action.payload.data.cards || []
        state.loading = false
      })
      .addCase(fetchCreditCards.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default paymentSlice.reducer

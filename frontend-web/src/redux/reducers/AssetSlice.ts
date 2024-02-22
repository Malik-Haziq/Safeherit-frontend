import { createSlice } from "@reduxjs/toolkit"
import { getAllAsset, getAllBeneficiaryAsset, getCurrencyRates } from "../actions/AssetAction"
import { Asset, Currency } from "@/types"

interface AssetState {
  // id: string,
  // category: string,
  // assignedBeneficiaryId: string,
  // data: any,
  Asset_array: Asset[]
  Currencies: Currency
}
const initialState: AssetState = {
  // id: "",
  // category: "",
  // assignedBeneficiaryId: "",
  // data: {},
  Asset_array: [],
  Currencies: {
    base: '',
    rates: {},
    date: ''
  }
}

export const slice = createSlice({
  name: "asset",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllAsset.fulfilled, (state, action) => {
      const array: Asset[] = []
      action?.payload?.data?.data.map((data: Asset) => {
        array.push({
          assignedBeneficiaryIds: data.assignedBeneficiaryIds,
          data: JSON.parse(data.data),
          privateKeysEncByBeneficiary: data.privateKeysEncByBeneficiary,
          id: data.id,
          category: data.category,
          privateKeyEncByOwner: data.privateKeyEncByOwner,
          beneficiaries: data.beneficiaries,
          asset_file: data.asset_file,
        })
      })
      state.Asset_array = array
    })
    builder.addCase(getAllBeneficiaryAsset.fulfilled, (state, action) => {
      const array: Asset[] = []
      action?.payload?.data?.data.map((data: Asset) => {
        array.push({
          assignedBeneficiaryIds: data.assignedBeneficiaryIds,
          data: JSON.parse(data.data),
          privateKeysEncByBeneficiary: data.privateKeysEncByBeneficiary,
          id: data.id,
          category: data.category,
          privateKeyEncByOwner: data.privateKeyEncByOwner,
          beneficiaries: data.beneficiaries,
          asset_file: data.asset_file,
        })
      })
      state.Asset_array = action?.payload?.data?.data
    })
    builder.addCase(getCurrencyRates.fulfilled, (state, action) => {
      state.Currencies = action?.payload?.data?.data
    })
  },
})

export default slice.reducer

import { createSlice } from "@reduxjs/toolkit"
import { getAllAsset, getAllBeneficiaryAsset, findAsset } from "../actions/AssetAction"

interface AssetState {
  id: string,
  category: string,
  assignedBeneficiaryId: string,
  data: any,
  Asset_array: { data: any, id: string, category: string, assignedBeneficiaryId: string, asset_file: string }[]
}
const initialState: AssetState = {
  id: "",
  category: "",
  assignedBeneficiaryId: "",
  data: {},
  Asset_array: [],
}

export const slice = createSlice({
  name: "asset",
  initialState,
  reducers: {
    addAsset: (state, action) => {
    }
  },
  extraReducers(builder) {
    builder.addCase(getAllAsset.fulfilled, (state, action) => {
      let array: { data: any, id: string, category: string, assignedBeneficiaryId: string, asset_file: string }[] = []
      action?.payload?.data?.data.map((data: { data: string, id: string, category: string, assignedBeneficiaryId: string, asset_file: string }) => {
        array.push(
          {
            assignedBeneficiaryId: data.assignedBeneficiaryId,
            data: JSON.parse(data.data),
            id: data.id,
            category: data.category,
            asset_file: data.asset_file
          }
        )
      })
      state.Asset_array = array
    })
    builder.addCase(getAllBeneficiaryAsset.fulfilled, (state, action) => {
      let array: { data: any, id: string, category: string, assignedBeneficiaryId: string, asset_file: string }[] = []
      action?.payload?.data?.data.map((data: { data: string, id: string, category: string, assignedBeneficiaryId: string, asset_file: string }) => {
        array.push(
          {
            assignedBeneficiaryId: data.assignedBeneficiaryId,
            data: JSON.parse(data.data),
            id: data.id,
            category: data.category,
            asset_file: data.asset_file
          }
        )
      })
      state.Asset_array = array
    })
    builder.addCase(findAsset.fulfilled, (state, action) => {

    })
  },
})

export const {addAsset} = slice.actions

export default slice.reducer

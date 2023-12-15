import { createSlice } from "@reduxjs/toolkit"
import { getAllAsset, getAllBeneficiaryAsset, findAsset } from "../actions/AssetAction"
import { Asset } from "@/types"

interface AssetState {
  // id: string,
  // category: string,
  // assignedBeneficiaryId: string,
  // data: any,
  Asset_array: Asset[]
}
const initialState: AssetState = {
  // id: "",
  // category: "",
  // assignedBeneficiaryId: "",
  // data: {},
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
      let array: Asset[] = []
      action?.payload?.data?.data.map((data: Asset) => {
        array.push(
          {
            assignedBeneficiaryIds: data.assignedBeneficiaryIds,
            data: JSON.parse(data.data),
            privateKeysEncByBeneficiary: data.privateKeysEncByBeneficiary,
            id: data.id,
            category: data.category,
            privateKeyEncByOwner: data.privateKeyEncByOwner,
            beneficiaries: data.beneficiaries,
            asset_file: data.asset_file
          }
        )
      })
      state.Asset_array = array
    })
    builder.addCase(getAllBeneficiaryAsset.fulfilled, (state, action) => {
      let array: Asset[] = []
      action?.payload?.data?.data.map((data: Asset) => {
        array.push(
          {
            assignedBeneficiaryIds: data.assignedBeneficiaryIds,
            data: JSON.parse(data.data),
            privateKeysEncByBeneficiary: data.privateKeysEncByBeneficiary,
            id: data.id,
            category: data.category,
            privateKeyEncByOwner: data.privateKeyEncByOwner,
            beneficiaries: data.beneficiaries,
            asset_file: data.asset_file
          }
        )
      })
      state.Asset_array = action?.payload?.data?.data
    })
    builder.addCase(findAsset.fulfilled, (state, action) => {

    })
  },
})

export const {addAsset} = slice.actions

export default slice.reducer

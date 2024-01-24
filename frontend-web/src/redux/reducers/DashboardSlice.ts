import { createSlice } from "@reduxjs/toolkit"
import { getData } from "../actions/DashboardAction"

const initialState = {
  assetCount: 0,
  beneficiaryCount: 0,
  validatorCount: 0,
  assets: [],
  beneficiaries: [],
  validators: [],
  loading: false,
  securityRating: "",
  securityScore: "",
}

export const slice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getData.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getData.fulfilled, (state, action) => {
      state.loading = false
      state.assetCount = action.payload?.data?.data?.assetCount
      state.beneficiaryCount = action.payload?.data?.data?.beneficiaryCount
      state.validatorCount = action.payload?.data?.data?.validatorCount
      state.securityRating = action.payload?.data?.data?.securityRating.rating
      state.securityScore = action.payload?.data?.data?.securityRating.score

      state.assets = action.payload?.data?.data?.assets?.map((asset: any) => {
        const data = JSON.parse(asset.data)
        return {
          // img: asset?.profile_image,
          title: asset?.category,
          subTitle: data?.Notes,
        }
      })
      state.beneficiaries = action.payload?.data?.data?.beneficiaries?.map(
        (beneficiary: any) => {
          return {
            img: beneficiary?.profile_image,
            title: beneficiary?.name,
            subTitle:
              beneficiary?.primary_email ||
              beneficiary?.backup_email ||
              beneficiary?.primary_backup_email2,
          }
        },
      )
      state.validators = action.payload?.data?.data?.validators?.map(
        (validator: any) => {
          return {
            img: validator?.profile_image,
            title: validator?.name,
            subTitle:
              validator?.primary_email ||
              validator?.backup_email ||
              validator?.primary_backup_email2,
          }
        },
      )
    })
  },
})

export default slice.reducer

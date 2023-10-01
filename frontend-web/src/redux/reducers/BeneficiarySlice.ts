import { createSlice } from "@reduxjs/toolkit"
import { getAllBeneficiary, createBeneficiary, findBeneficiary } from "../actions/BeneficiaryAction"
import { SelectOption } from "@/types"

const initialState = {
  id: "",
  name: "",
  primary_email: "",
  backup_email: "",
  backup_email2: "",
  phone_number: "",
  backup_phone_number: "",
  facebook_link: "",
  instagram_username: "",
  twitter_username: "",
  personalized_message: "",
  personalized_video: "",
  profile_image: "",
  beneficiary_array: [{}],
  beneficiary_list: [] as SelectOption[],
}

export const slice = createSlice({
  name: "beneficiary",
  initialState,
  reducers: {
    addBeneficiary: (state, action) => {
      state.beneficiary_array = [...state.beneficiary_array, action.payload]
    }
  },
  extraReducers(builder) {
    builder.addCase(getAllBeneficiary.fulfilled, (state, action) => {
      state.beneficiary_array = action?.payload?.data?.data || []
      let beneficiary_list: SelectOption[] = []
      action.payload.data.data.map ((item: any) => {
        beneficiary_list.push({
          label: item.name,
          value: item.id,
        })
      }) 
      state.beneficiary_list = beneficiary_list
    })
    builder.addCase(createBeneficiary.fulfilled, (state, action) => {

    })
    builder.addCase(findBeneficiary.fulfilled, (state, action) => {

    })
  },
})

export const {addBeneficiary} = slice.actions

export default slice.reducer

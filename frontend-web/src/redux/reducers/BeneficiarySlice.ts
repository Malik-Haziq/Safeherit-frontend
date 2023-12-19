import { createSlice } from "@reduxjs/toolkit"
import { getAllBeneficiary, findTestment } from "../actions/BeneficiaryAction"
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
  public_key: "",
  beneficiary_array: [{}],
  beneficiary_list: [] as SelectOption[],
  beneficiary_mapper: {} as { [key: string]: any },
}

export const slice = createSlice({
  name: "beneficiary",
  initialState,
  reducers: {
    addBeneficiary: (state, action) => {
      state.beneficiary_array = [...state.beneficiary_array, action.payload]
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllBeneficiary.fulfilled, (state, action) => {
      state.beneficiary_array = action?.payload?.data?.data || []
      const beneficiary_list: SelectOption[] = []
      const beneficiaryMapper: { [key: string]: any } = {}

      action.payload.data.data.map((item: any) => {
        beneficiary_list.push({
          label: item.name,
          value: item.id,
        })
        beneficiaryMapper[item.id] = {
          public_key: item.public_key,
        }
      })
      state.beneficiary_list = beneficiary_list
      state.beneficiary_mapper = beneficiaryMapper
    })
    builder.addCase(findTestment.fulfilled, (state, action) => {
      state.personalized_video = action.payload.data.data.personalized_video
      state.backup_email = action.payload.data.data.backup_email
      state.personalized_message = action.payload.data.data.personalized_message
      state.facebook_link = action.payload.data.data.facebook_link
      state.name = action.payload.data.data.name
      state.twitter_username = action.payload.data.data.twitter_username
      state.phone_number = action.payload.data.data.phone_number
      state.primary_email = action.payload.data.data.primary_email
      state.id = action.payload.data.data.id
      state.instagram_username = action.payload.data.data.instagram_username
      state.backup_email2 = action.payload.data.data.backup_email2
      state.backup_phone_number = action.payload.data.data.backup_phone_number
      state.public_key = action.payload.data.data.public_key
    })
  },
})

export const { addBeneficiary } = slice.actions

export default slice.reducer

import { createSlice } from "@reduxjs/toolkit"
import { login, loginWithGoogle, logout, signup, getUser, updateUser, updatePK } from "../actions/UserActions"
import { SelectOption } from "@/types"

type PulseDetails = {
  [key: string]: { heading: string; subHeading: string }[];
}
interface UserState {
  email: string
  name: string
  photo: string
  phone: string
  access: string
  active: boolean
  token: string
  displayName: string
  language: string
  profile_image: string
  loading: boolean
  beneficiaryOf: {}[]
  _beneficiaryOf: SelectOption[]
  _validatorOf: SelectOption[]
  isBeneficiary: boolean
  isOwner: boolean
  isSuperAdmin: boolean
  isAdmin: boolean
  isValidator: boolean
  role: string
  selectedRoleUser: {[key: string]: any}
  userMap: {[key: string]: any}
  pulseDetail: PulseDetails
  pulseCheckNonValidationMonths: string
  pulseCheckDays: string
  pulseCheckActive: string
  pulseCheckValidationRequired: string
  publicKey: string
}
const initialState: UserState = {
  email: "",
  name: "",
  photo: "",
  phone: "",
  access: "",
  active: false,
  token: "",
  displayName: "",
  language: "",
  profile_image: "",
  loading: false,
  beneficiaryOf: [],
  _beneficiaryOf: [],
  _validatorOf: [],
  isBeneficiary: false,
  isOwner: false,
  isSuperAdmin: false,
  isAdmin: false,
  isValidator: false,
  role: "none",
  selectedRoleUser: {},
  userMap: {},
  pulseDetail: {
    'Email': [
      { heading: "Primary Phone", subHeading: "gmail.com" },
      { heading: "Backup Phone 1", subHeading: "+ymail" },
      { heading: "Backup Phone 2", subHeading: "+9 234 566 " },
    ],
    'Phone': [
      { heading: "Primary Phone", subHeading: "+1 234 566 890" },
      { heading: "Backup Phone 1", subHeading: "+7 234 566 890" },
      { heading: "Backup Phone 2", subHeading: "+9 234 566 560" },
    ],
    'Social media': [
      { heading: "Social media", subHeading: "hard coded" },
      { heading: "Social media 1", subHeading: "hard coded" },
      { heading: "Social media 2", subHeading: "hard coded" },
    ],
  },
  pulseCheckNonValidationMonths: '',
  pulseCheckDays: '',
  pulseCheckActive: '',
  pulseCheckValidationRequired: '',
  publicKey: '',
}

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName: (state, action) => {
      state.name = action.payload
    },
    updateActive: (state, action) => {
      state.active = action.payload
    },
    updateRole: (state, action) => {
      state.role = action.payload
    },
    updateRoleCheck: (state, action) => {
      switch (action.payload.role)
      {
        case "owner": {
          state.isOwner = action.payload.value
          break;
        }
        case "beneficiary": {
          state.isBeneficiary = action.payload.value
          break;
        }
        case "validator": {
          state.isValidator = action.payload.value
          break;
        }
        case "admin": {
          state.isAdmin = action.payload.value
          break;
        }
        case "super-admin": {
          state.isSuperAdmin = action.payload.value
          break;
        }
      }
    },
    updatePhone: (state, action) => {
      state.phone = action.payload
    },
    updateRoleUser: (state, action) => {
      if (action.payload.role == "beneficiary") {
        state.publicKey = action.payload.public_key
      }
      state.selectedRoleUser = {
        "ownerEmail": action.payload.ownerEmail,
        "beneficiaryId": action.payload.beneficiaryId,
        "ownerName": action.payload.ownerName,
      }
    },
    resetMapper: (state) => {
      state.userMap = {}
    },
    resetBeneficiaryOf: (state) => {
      state._beneficiaryOf = []
    },
    resetValidatorOf: (state) => {
      state._validatorOf = []
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setCredentials: (state, action) => {
      state.token = action.payload.token
      state.email = action.payload.email
      state.displayName = action.payload.user || ""
      state.photo = action.payload.user || ""
      state.phone = action.payload.user || ""
    }
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
      state.email = action.payload.user.email || ""
      state.displayName = action.payload.user.displayName || ""
      state.photo = action.payload.user.photoURL || ""
      state.phone = action.payload.user.phoneNumber || ""
    })
    builder.addCase(loginWithGoogle.fulfilled, (state, action) => {
      state.email = action.payload.user.email || ""
      state.displayName = action.payload.user.displayName || ""
      state.photo = action.payload.user.photoURL || ""
      state.phone = action.payload.user.phoneNumber || ""
    })
    builder.addCase(signup.fulfilled, (state, action) => {
      state.email = action.payload.user.email || ""
      state.name = action.payload.user.displayName || ""
      state.photo = action.payload.user.photoURL || ""
      state.phone = action.payload.user.phoneNumber || ""
      state.active = true
      state.role = "owner"
      state.isOwner = true
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      return initialState
    })
    builder.addCase(getUser.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false
      const methodArr: PulseDetails = {
        'Email': [
          { heading: "Pulse Check Email 1", subHeading: action.payload.data.data.pulseCheckEmail1 },
          { heading: "Pulse Check Email 2", subHeading: action.payload.data.data.pulseCheckEmail2 },
          { heading: "Pulse Check Email 3", subHeading: action.payload.data.data.pulseCheckEmail3 },
        ],
        'Phone': [
          { heading: "Primary Phone", subHeading: action.payload.data.data.pulseCheckPhone1 },
          { heading: "Backup Phone 1", subHeading: action.payload.data.data.pulseCheckPhone2 },
        ],
        'Social media': [
          { heading: "Social media", subHeading: "hard coded" },
          { heading: "Social media 1", subHeading: "hard coded" },
          { heading: "Social media 2", subHeading: "hard coded" },
        ],
      }
      state.pulseDetail = methodArr
      state.pulseCheckNonValidationMonths = action.payload.data.data.pulseCheckNonValidationMonths
      state.pulseCheckActive = action.payload.data.data.pulseCheckActive
      state.pulseCheckDays = action.payload.data.data.pulseCheckDays
      state.pulseCheckValidationRequired = action.payload.data.data.pulseCheckValidationRequired
      state.displayName = action.payload.data.data.displayName
      state.language = action.payload.data.data.language
      state.profile_image = action.payload.data.data.profile_image
      state.isBeneficiary = action.payload.data.data.isBeneficiary
      state.isOwner = action.payload.data.data.isOwner
      state.isSuperAdmin = action.payload.data.data.isSuperAdmin
      state.isAdmin = action.payload.data.data.isAdmin
      state.isValidator = action.payload.data.data.isValidator
      state.beneficiaryOf = action.payload.data.data._beneficiaryOf
      state.publicKey = action.payload.data.data?.publicKey || ""

      let beneficiaryOfArray: SelectOption[] = []
      const beneficiaryMapper: {[key: string]: any} = {};

      if (action.payload.data.data._beneficiaryOf) {
        action.payload.data.data._beneficiaryOf.forEach((element: any) => {
          beneficiaryOfArray.push({
            label: element.ownerEmail + " - " + element.ownerName,
            value: element.beneficiaryId
          })
          beneficiaryMapper[element.beneficiaryId] = {
            ownerEmail: element.ownerEmail,
            beneficiaryId: element.beneficiaryId,
            ownerName: element.ownerName,
            public_key: element.public_key,
            role: "beneficiary"
          }
        })
        state.userMap = beneficiaryMapper
        state._beneficiaryOf = beneficiaryOfArray
      }

      let validatorOfArray: SelectOption[] = []
      const validatorMapper: {[key: string]: any} = {};

      if (action.payload.data.data._validatorOf) {
        action.payload.data.data._validatorOf.forEach((element: any) => {
          validatorOfArray.push({
            label: element.ownerEmail + " - " + element.ownerName,
            value: element.validatorId,
          })
          validatorMapper[element.validatorId] = {
            ownerEmail: element.ownerEmail,
            validatorId: element.validatorId,
            ownerName: element.ownerName,
            role: "validator"
          }
        })
        state.userMap = {...state.userMap, ...validatorMapper}
        state._validatorOf = validatorOfArray
      }
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.displayName = action.payload.data.data.displayName
      state.language = action.payload.data.data.language
      state.profile_image = action.payload.data.data.profile_image
      state.active = true
    })
    builder.addCase(updatePK.fulfilled, (state, action) => {
      state.publicKey = action.payload.data.data.publicKey
    })
  },
})

export const { updateName, updateActive, setToken, updateRole, updatePhone, updateRoleUser, resetMapper, resetBeneficiaryOf, resetValidatorOf, setCredentials, updateRoleCheck } = slice.actions

export default slice.reducer

import { createSlice } from "@reduxjs/toolkit"
import {
  login,
  loginWithGoogle,
  logout,
  getUser,
  updateUser,
  updatePK,
} from "../actions/UserActions"
import { SelectOption } from "@/types"

type PulseDetails = {
  [key: string]: { heading: string; subHeading: string }[]
}
interface UserState {
  uid: string
  email: string
  photo: string
  phone: string
  access: string
  accountStatus: string
  token: string
  displayName: string
  language: string
  profile_image: string
  loading: boolean
  beneficiaryOf: object[]
  _beneficiaryOf: SelectOption[]
  _validatorOf: SelectOption[]
  isBeneficiary: boolean
  isOwner: boolean
  isSuperAdmin: boolean
  isAdmin: boolean
  isValidator: boolean
  numOfValidatorOfUser: number
  role: string
  selectedRoleUser: { [key: string]: any }
  userMap: { [key: string]: any }
  pulseDetail: PulseDetails
  pulseCheckNonValidationDays: string
  pulseCheckDays: string
  pulseCheckActive: boolean
  pulseCheckValidationRequired: string
  publicKey: string
  paymentStatus: string
  startupWizardCompleted: boolean
  lastPulseCheck: string
  nextPulseCheckDueDays: string
  wizardStep: string
  periodEnd: number
  periodStart: number
  plan: string
}
const initialState: UserState = {
  uid: "",
  email: "",
  photo: "",
  phone: "",
  access: "",
  accountStatus: "",
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
  numOfValidatorOfUser: 0,
  role: "none",
  selectedRoleUser: {},
  userMap: {},
  pulseDetail: {
    Email: [
      { heading: "Primary Phone", subHeading: "gmail.com" },
      { heading: "Backup Phone 1", subHeading: "+ymail" },
      { heading: "Backup Phone 2", subHeading: "+9 234 566 " },
    ],
    Phone: [
      { heading: "Primary Phone", subHeading: "+1 234 566 890" },
      { heading: "Backup Phone 1", subHeading: "+7 234 566 890" },
      { heading: "Backup Phone 2", subHeading: "+9 234 566 560" },
    ],
    "Social media": [
      { heading: "Social media", subHeading: "hard coded" },
      { heading: "Social media 1", subHeading: "hard coded" },
      { heading: "Social media 2", subHeading: "hard coded" },
    ],
  },
  pulseCheckNonValidationDays: "",
  pulseCheckDays: "",
  pulseCheckActive: false,
  pulseCheckValidationRequired: "",
  publicKey: "",
  paymentStatus: "",
  startupWizardCompleted: false,
  wizardStep: "none",
  lastPulseCheck: "",
  nextPulseCheckDueDays: "",
  periodEnd: 0,
  periodStart: 0,
  plan: '',
}

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName: (state, action) => {
      state.displayName = action.payload
    },
    updateRole: (state, action) => {
      state.role = action.payload
      localStorage.setItem("role", btoa(action.payload))
    },
    updateRoleCheck: (state, action) => {
      switch (action.payload.role) {
        case "owner": {
          state.isOwner = action.payload.value
          break
        }
        case "beneficiary": {
          state.isBeneficiary = action.payload.value
          break
        }
        case "validator": {
          state.isValidator = action.payload.value
          break
        }
        case "admin": {
          state.isAdmin = action.payload.value
          break
        }
        case "super-admin": {
          state.isSuperAdmin = action.payload.value
          break
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
      state.selectedRoleUser = action.payload
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
      state.token = action.payload
    },

    setCredentials: (state, action) => {
      state.token = action.payload.token
      state.email = action.payload.email
      state.displayName = action.payload.user || ""
      state.photo = action.payload.user || ""
      state.phone = action.payload.user || ""
    },
    setWizardStep: (state, action) => {
      state.wizardStep = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
      state.email = action.payload.data.data.email
      state.uid = action.payload.data.data.uid
      state.startupWizardCompleted =
        action.payload.data.data.startupWizardCompleted
      state.wizardStep = !action.payload.data.data.startupWizardCompleted
        ? "Dashboard"
        : "none"
      state.displayName = action.payload.data.data.displayName
      state.isSuperAdmin = action.payload.data.data.isSuperAdmin
      state.language = action.payload.data.data.language
      state.isAdmin = action.payload.data.data.isAdmin
      state.accountStatus = action.payload.data.data.accountStatus
      state.isOwner = action.payload.data.data.isOwner
      state.pulseCheckActive = action.payload.data.data.pulseCheckActive
      state.isBeneficiary = action.payload.data.data.isBeneficiary
      state.paymentStatus = action.payload.data.data.paymentStatus
      state.isValidator = action.payload.data.data.isValidator
      const _role = localStorage.getItem("role") || ""
      state.role = atob(_role) || "none"
    })
    builder.addCase(loginWithGoogle.fulfilled, (state, action) => {
      state.email = action.payload.data.data.email
      state.uid = action.payload.data.data.uid
      state.startupWizardCompleted =
        action.payload.data.data.startupWizardCompleted
      state.wizardStep = !action.payload.data.data.startupWizardCompleted
        ? "Dashboard"
        : "none"
      state.displayName = action.payload.data.data.displayName
      state.isSuperAdmin = action.payload.data.data.isSuperAdmin
      state.language = action.payload.data.data.language
      state.isAdmin = action.payload.data.data.isAdmin
      state.accountStatus = action.payload.data.data.accountStatus
      state.isOwner = action.payload.data.data.isOwner
      state.pulseCheckActive = action.payload.data.data.pulseCheckActive
      state.isBeneficiary = action.payload.data.data.isBeneficiary
      state.paymentStatus = action.payload.data.data.paymentStatus
      state.isValidator = action.payload.data.data.isValidator
      const _role = localStorage.getItem("role") || ""
      state.role = atob(_role) || "none"
    })
    builder.addCase(logout.fulfilled, () => {
      return initialState
    })
    builder.addCase(getUser.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false
      const methodArr: PulseDetails = {
        Email: [
          {
            heading: "Pulse Check Email 1",
            subHeading: action.payload.data.data?.pulseCheckEmail1,
          },
          {
            heading: "Pulse Check Email 2",
            subHeading: action.payload.data.data?.pulseCheckEmail2,
          },
          {
            heading: "Pulse Check Email 3",
            subHeading: action.payload.data.data?.pulseCheckEmail3,
          },
        ],
        Phone: [
          {
            heading: "Primary Phone",
            subHeading: action.payload.data.data?.pulseCheckPhone1,
          },
          {
            heading: "Backup Phone 1",
            subHeading: action.payload.data.data?.pulseCheckPhone2,
          },
          {
            heading: "Backup Phone 2",
            subHeading: action.payload.data.data?.pulseCheckPhone3,
          },
        ],
        "Social media": [
          { heading: "Social media", subHeading: "hard coded" },
          { heading: "Social media 1", subHeading: "hard coded" },
          { heading: "Social media 2", subHeading: "hard coded" },
        ],
      }
      state.email = action.payload.data.data?.email
      state.pulseDetail = methodArr
      state.pulseCheckNonValidationDays =
        action.payload.data.data?.pulseCheckNonValidationDays
      state.pulseCheckActive = action.payload.data.data?.pulseCheckActive
      state.pulseCheckDays = action.payload.data.data?.pulseCheckDays
      state.pulseCheckValidationRequired =
        action.payload.data.data?.pulseCheckValidationRequired
      state.displayName =
        action.payload.data.data?.displayName || state.displayName
      state.language = action.payload.data.data?.language
      state.profile_image =
        action.payload.data.data?.profile_image || state.profile_image
      state.isBeneficiary = action.payload.data.data?.isBeneficiary
      state.isOwner = action.payload.data.data?.isOwner
      state.isSuperAdmin = action.payload.data.data?.isSuperAdmin
      state.isAdmin = action.payload.data.data?.isAdmin
      state.isValidator = action.payload.data.data?.isValidator
      state.numOfValidatorOfUser =
        action.payload.data.data?.numOfValidatorOfUser
      state.beneficiaryOf = action.payload.data.data?._beneficiaryOf
      state.publicKey = action.payload.data.data?.publicKey || ""
      state.uid = action.payload.data.data?.uid || ""
      state.startupWizardCompleted =
        action.payload.data.data.startupWizardCompleted
      state.wizardStep = !action.payload.data.data.startupWizardCompleted
        ? "Dashboard"
        : "none"
      state.paymentStatus = action.payload.data.data?.paymentStatus || ""
      const _role = localStorage.getItem("role") || ""
      state.role = atob(_role) || "none"
      state.periodEnd = action.payload.data.data?.periodEnd
      state.periodStart = action.payload.data.data?.periodStart
      state.plan = action.payload.data.data?.plan
    

      if (action.payload.data.data?.pulseCheckActive) {
        const pulseCheckLastResetAt =
          action.payload.data.data?.pulseCheckLastResetAt

        const milliseconds =
          pulseCheckLastResetAt?._seconds * 1000 +
          pulseCheckLastResetAt?._nanoseconds / 1e6
        const date = new Date(milliseconds)
        state.lastPulseCheck = date.toISOString().split("T")[0]
        state.nextPulseCheckDueDays =
          action.payload.data.data?.nextPulseCheckDueDays
      }

      const beneficiaryOfArray: SelectOption[] = []
      const beneficiaryMapper: { [key: string]: any } = {}

      if (action.payload.data.data._beneficiaryOf) {
        action.payload.data.data._beneficiaryOf.forEach((element: any) => {
          beneficiaryOfArray.push({
            label: element.ownerEmail + " - " + element.ownerName,
            value: element.beneficiaryId,
          })
          beneficiaryMapper[element.beneficiaryId] = {
            ownerEmail: element.ownerEmail,
            beneficiaryId: element.beneficiaryId,
            ownerName: element.ownerName,
            public_key: element.public_key,
            role: "beneficiary",
          }
        })
        state.userMap = beneficiaryMapper
        state._beneficiaryOf = beneficiaryOfArray
      }

      const validatorOfArray: SelectOption[] = []
      const validatorMapper: { [key: string]: any } = {}

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
            role: "validator",
          }
        })
        state.userMap = { ...state.userMap, ...validatorMapper }
        state._validatorOf = validatorOfArray
      }
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.displayName =
        action.payload.data.data.displayName || state.displayName
      state.language = action.payload.data.data.language
      state.profile_image = action.payload.data.data.profile_image
      state.startupWizardCompleted =
        action.payload.data.data.startupWizardCompleted
    })
    builder.addCase(updatePK.fulfilled, (state, action) => {
      state.publicKey = action.payload.data.data.publicKey
    })
  },
})

export const {
  updateName,
  setToken,
  updateRole,
  updatePhone,
  updateRoleUser,
  resetMapper,
  resetBeneficiaryOf,
  resetValidatorOf,
  setCredentials,
  updateRoleCheck,
  setWizardStep,
} = slice.actions

export default slice.reducer

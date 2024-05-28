import {
  ALL_ASSETS,
  ASSETS,
  BENEFICIARY_ASSETS,
  BENEFICIARY_ASSET_BY_ID,
  CURRENCY_RATES,
  DELETE,
  GET,
  POST,
  PUT,
  jsonToFormData,
} from "@/common"
import AssetEncryption from "@/common/encryption/assetEncryption"
import Encryption from "@/common/encryption/encryption"
import { createAsyncThunk } from "@reduxjs/toolkit"

const assetEnc = new AssetEncryption()
const encryptionService = new Encryption()

export const getAllAsset = createAsyncThunk(
  "getAllAsset",
  async (Data: object, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: { token: string; uid: string } }
    const params = { ROUTE: ALL_ASSETS, Body: {}, token: user.token }
    // user logged in would be owner
    const ownerPrivateKey = localStorage.getItem("privateKey")
    const _ownerPrivateKey = ownerPrivateKey
      ? encryptionService.decryptKeys(ownerPrivateKey, user.uid)
      : ""
    try {
      const response = await GET(params)
      response.data.data = response.data.data.map((asset: any) => {
        return assetEnc.decryptAssetDataForOwner(_ownerPrivateKey, asset)
      })
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const getAllBeneficiaryAsset = createAsyncThunk(
  "getAllBeneficiaryAsset",
  async (Data: object, { getState, rejectWithValue }) => {
    const { user } = getState() as {
      user: {
        token: string
        uid: string
        selectedRoleUser: {
          ownerEmail: string
          beneficiaryId: string
          ownerName: string
        }
      }
    }
    const owner_email = user.selectedRoleUser?.ownerEmail
    const beneficiary_id = user.selectedRoleUser?.beneficiaryId
    const params = {
      ROUTE: `${BENEFICIARY_ASSETS}?owner_email=${owner_email}&beneficiary_id=${beneficiary_id}`,
      Body: {},
      token: user.token,
    }
    // user logged in would be beneficiary
    const beneficiaryPrivateKey = localStorage.getItem("privateKey")
    const _beneficiaryPrivateKey = beneficiaryPrivateKey
      ? encryptionService.decryptKeys(beneficiaryPrivateKey, user.uid)
      : ""
    try {
      const response = await GET(params)
      response.data.data = response.data.data.map((asset: any) => {
        return assetEnc.decryptAssetDataForBeneficiary(
          _beneficiaryPrivateKey,
          beneficiary_id,
          asset,
        )
      })
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const createAsset = createAsyncThunk(
  "createAsset",
  async (Data: any, { getState, rejectWithValue }) => {
    const { user } = getState() as {
      user: { token: string; publicKey: string; uid: string }
    }
    const ownerPublicKey = user.publicKey
    const ownerPrivateKey = localStorage.getItem("privateKey")
    const _ownerPrivateKey = ownerPrivateKey
      ? encryptionService.decryptKeys(ownerPrivateKey, user.uid)
      : ""
    Data = assetEnc.encryptAssetData(_ownerPrivateKey, ownerPublicKey, Data)

    Data.assignedBeneficiaryIds = JSON.stringify(Data.assignedBeneficiaryIds)
    Data.privateKeysEncByBeneficiary =
      JSON.stringify(Data.privateKeysEncByBeneficiary) || ""

    const formData = jsonToFormData(Data)

    const params = { ROUTE: ASSETS, Body: formData, token: user.token }
    try {
      const response = await POST(params)
      response.data.data = assetEnc.decryptAssetDataForOwner(
        _ownerPrivateKey,
        response.data.data,
      )
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const findAsset = createAsyncThunk(
  "findAsset",
  async (Data: { id: string }, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: { token: string; uid: string } }
    const params = {
      ROUTE: `${ASSETS}?id=${Data.id}`,
      Body: {},
      token: user.token,
    }
    const ownerPrivateKey = localStorage.getItem("privateKey")
    const _ownerPrivateKey = ownerPrivateKey
      ? encryptionService.decryptKeys(ownerPrivateKey, user.uid)
      : ""
    try {
      const response = await GET(params)
      response.data.data = assetEnc.decryptAssetDataForOwner(
        _ownerPrivateKey,
        response.data.data,
      )
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const findBeneficiaryAsset = createAsyncThunk(
  "findAsset",
  async (
    Data: { id: string; owner_email: string; beneficiary_id: string },
    { getState, rejectWithValue },
  ) => {
    const { user } = getState() as { user: { token: string; uid: string } }
    const params = {
      ROUTE: `${BENEFICIARY_ASSET_BY_ID}?id=${Data.id}&beneficiary_id=${Data.beneficiary_id}&owner_email=${Data.owner_email}`,
      Body: {},
      token: user.token,
    }
    const beneficiaryPrivateKey = localStorage.getItem("privateKey")
    const _beneficiaryPrivateKey = beneficiaryPrivateKey
      ? encryptionService.decryptKeys(beneficiaryPrivateKey, user.uid)
      : ""
    try {
      const response = await GET(params)
      response.data.data = assetEnc.decryptAssetDataForBeneficiary(
        _beneficiaryPrivateKey,
        Data.beneficiary_id,
        response.data.data,
      )
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const updateAsset = createAsyncThunk(
  "updateAsset",
  async (Data: any, { getState, rejectWithValue }) => {
    const { user } = getState() as {
      user: { token: string; publicKey: string; uid: string }
    }
    const ownerPublicKey = user.publicKey
    const ownerPrivateKey = localStorage.getItem("privateKey")
    const _ownerPrivateKey = ownerPrivateKey
      ? encryptionService.decryptKeys(ownerPrivateKey, user.uid)
      : ""

    Data = assetEnc.encryptAssetData(_ownerPrivateKey, ownerPublicKey, Data)

    Data.assignedBeneficiaryIds = JSON.stringify(Data.assignedBeneficiaryIds)
    Data.privateKeysEncByBeneficiary =
      JSON.stringify(Data.privateKeysEncByBeneficiary) || ""

    const formData = jsonToFormData(Data)
    const params = { ROUTE: ASSETS, Body: formData, token: user.token }
    try {
      const response = await PUT(params)
      response.data.data = assetEnc.decryptAssetDataForOwner(
        _ownerPrivateKey,
        response.data.data,
      )
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const deleteAsset = createAsyncThunk(
  "deleteAsset",
  async (Data: { id: string }, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: { token: "" } }
    const params = {
      ROUTE: `${ASSETS}?id=${Data.id}`,
      Body: {},
      token: user.token,
    }
    try {
      const response = await DELETE(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)
export const getCurrencyRates = createAsyncThunk(
  "getCurrencyRates",
  async (Data: { }, { getState, rejectWithValue }) => {
    const params = {
      ROUTE: CURRENCY_RATES,
      Body: {},
    }
    try {
      const response = await GET(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

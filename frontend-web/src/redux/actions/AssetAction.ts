import {
  ALL_ASSETS,
  ASSETS,
  BENEFICIARY_ASSETS,
  BENEFICIARY_ASSET_BY_ID,
  DELETE,
  GET,
  POST,
  PUT,
  jsonToFormData,
} from "@/common"
import AssetEncryption from "@/common/encryption/assetEncryption"
import { createAsyncThunk } from "@reduxjs/toolkit"

const assetEnc = new AssetEncryption()

export const getAllAsset = createAsyncThunk(
  "getAllAsset",
  async (Data: object, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: { token: "" } }
    const params = { ROUTE: ALL_ASSETS, Body: {}, token: user.token }
    // user logged in would be owner
    const ownerPrivateKey = localStorage.getItem("privateKey") || ""
    try {
      const response = await GET(params)
      response.data.data = response.data.data.map((asset: any) => {
        return assetEnc.decryptAssetDataForOwner(ownerPrivateKey, asset)
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
        token: ""
        selectedRoleUser: { ownerEmail: ""; beneficiaryId: ""; ownerName: "" }
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
    const beneficiaryPrivateKey = localStorage.getItem("privateKey") || ""
    try {
      const response = await GET(params)
      response.data.data = response.data.data.map((asset: any) => {
        return assetEnc.decryptAssetDataForBeneficiary(
          beneficiaryPrivateKey,
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
    const { user } = getState() as { user: { token: ""; publicKey: "" } }
    const ownerPrivateKey = localStorage.getItem("privateKey") || ""
    const ownerPublicKey = user.publicKey

    Data = assetEnc.encryptAssetData(ownerPrivateKey, ownerPublicKey, Data)

    Data.assignedBeneficiaryIds = JSON.stringify(Data.assignedBeneficiaryIds)
    Data.privateKeysEncByBeneficiary =
      JSON.stringify(Data.privateKeysEncByBeneficiary) || ""

    const formData = jsonToFormData(Data)

    const params = { ROUTE: ASSETS, Body: formData, token: user.token }
    try {
      const response = await POST(params)
      response.data.data = assetEnc.decryptAssetDataForOwner(
        ownerPrivateKey,
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
    const { user } = getState() as { user: { token: "" } }
    const params = {
      ROUTE: `${ASSETS}?id=${Data.id}`,
      Body: {},
      token: user.token,
    }
    const ownerPrivateKey = localStorage.getItem("privateKey") || ""
    try {
      const response = await GET(params)
      response.data.data = assetEnc.decryptAssetDataForOwner(
        ownerPrivateKey,
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
    const { user } = getState() as { user: { token: "" } }
    const params = {
      ROUTE: `${BENEFICIARY_ASSET_BY_ID}?id=${Data.id}&beneficiary_id=${Data.beneficiary_id}&owner_email=${Data.owner_email}`,
      Body: {},
      token: user.token,
    }
    const beneficiaryPrivateKey = localStorage.getItem("privateKey") || ""
    try {
      const response = await GET(params)
      response.data.data = assetEnc.decryptAssetDataForBeneficiary(
        beneficiaryPrivateKey,
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
    const { user } = getState() as { user: { token: ""; publicKey: "" } }
    const ownerPrivateKey = localStorage.getItem("privateKey") || ""
    const ownerPublicKey = user.publicKey

    Data = assetEnc.encryptAssetData(ownerPrivateKey, ownerPublicKey, Data)

    Data.assignedBeneficiaryIds = JSON.stringify(Data.assignedBeneficiaryIds)
    Data.privateKeysEncByBeneficiary =
      JSON.stringify(Data.privateKeysEncByBeneficiary) || ""

    const formData = jsonToFormData(Data)
    const params = { ROUTE: ASSETS, Body: formData, token: user.token }
    try {
      const response = await PUT(params)
      response.data.data = assetEnc.decryptAssetDataForOwner(
        ownerPrivateKey,
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

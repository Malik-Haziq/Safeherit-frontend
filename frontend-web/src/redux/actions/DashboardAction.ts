import { GET, GET_DATA } from "@/common"
import AssetEncryption from "@/common/encryption/assetEncryption"
import Encryption from "@/common/encryption/encryption"
import { createAsyncThunk } from "@reduxjs/toolkit"

const assetEnc = new AssetEncryption()
const encryptionService = new Encryption()
export const getData = createAsyncThunk(
  "getData",
  async (Data: object, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: { token: string; uid: string } }
    const params = { ROUTE: GET_DATA, Body: {}, token: user.token }
    const ownerPrivateKey = localStorage.getItem("_privateKey")
    const _ownerPrivateKey = ownerPrivateKey
      ? encryptionService.decryptKeys(ownerPrivateKey, user.uid)
      : ""

    try {
      const response = await GET(params)
      response.data.data.assets = response.data.data.assets.map(
        (asset: any) => {
          return assetEnc.decryptAssetDataForOwner(_ownerPrivateKey, asset)
        },
      )
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

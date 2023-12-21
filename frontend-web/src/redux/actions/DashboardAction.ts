import { GET, GET_DATA } from "@/common"
import AssetEncryption from "@/common/encryption/assetEncryption"
import { createAsyncThunk } from "@reduxjs/toolkit"

const assetEnc = new AssetEncryption()
export const getData = createAsyncThunk(
  "getData",
  async (Data: object, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: { token: "" } }
    const params = { ROUTE: GET_DATA, Body: {}, token: user.token }
    const ownerPrivateKey = sessionStorage.getItem("privateKey") || ""

    try {
      const response = await GET(params)
      response.data.data.assets = response.data.data.assets.map(
        (asset: any) => {
          return assetEnc.decryptAssetDataForOwner(ownerPrivateKey, asset)
        },
      )
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

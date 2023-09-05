import { createSlice } from "@reduxjs/toolkit"
import { login, logout, signup } from "../actions/UserActions"

const initialState = {
  email: "",
  name: "",
  photo: "",
  phone: "",
  access: "",
  active: false
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
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
      state.email = action.payload.user.email || ""
      state.name = action.payload.user.displayName || ""
      state.photo = action.payload.user.photoURL || ""
      state.phone = action.payload.user.phoneNumber || ""
      state.active = true
    })
    builder.addCase(signup.fulfilled, (state, action) => {
      state.email = action.payload.user.email || ""
      state.name = action.payload.user.displayName || ""
      state.photo = action.payload.user.photoURL || ""
      state.phone = action.payload.user.phoneNumber || ""
      state.active = true
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      return initialState
    })
  },
})

export const { updateName, updateActive } = slice.actions

export default slice.reducer

// { login
//   "uid": "07Gfr7VjBsVHKEbDQqjkdvhOl4g2",
//   "email": "mehran0@ucp.edu.pk",
//   "emailVerified": false,
//   "isAnonymous": false,
//   "providerData": [
//       {
//           "providerId": "password",
//           "uid": "mehran0@ucp.edu.pk",
//           "displayName": null,
//           "email": "mehran0@ucp.edu.pk",
//           "phoneNumber": null,
//           "photoURL": null
//       }
//   ],
//   "stsTokenManager": {
//       "refreshToken": "AMf-vBxKPkfgyhgUPO-WpW-7sgL35hLHwLJudvAZvPZ8CaSp03r6rDIuoQ2mIMyPQffpKOUIGijdMX3E9d4n5A1E7MBo2rPdsP73HG9PzL9D1zntJlqb4Hd3fcFjQA9BZTwzk5fRMUchhCAANrmJttUjpgS3gZ4Y5z0k_CfgFiGl0qa-1swkQSmPqDFk5g6_T65nUxCMzkW17TVi-RFNss4-4yIGmPGp1A",
//       "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjYzODBlZjEyZjk1ZjkxNmNhZDdhNGNlMzg4ZDJjMmMzYzIzMDJmZGUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2FmZWhlcml0LTQzMWM0IiwiYXVkIjoic2FmZWhlcml0LTQzMWM0IiwiYXV0aF90aW1lIjoxNjkyMTE1NDcwLCJ1c2VyX2lkIjoiMDdHZnI3VmpCc1ZIS0ViRFFxamtkdmhPbDRnMiIsInN1YiI6IjA3R2ZyN1ZqQnNWSEtFYkRRcWprZHZoT2w0ZzIiLCJpYXQiOjE2OTIxMTU0NzAsImV4cCI6MTY5MjExOTA3MCwiZW1haWwiOiJtZWhyYW4wQHVjcC5lZHUucGsiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibWVocmFuMEB1Y3AuZWR1LnBrIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.jUjIGRiEA9cKD02-u7H9BmcyAeA7wafE2_CaI4Sax4Qao8dSSWbjujd9EUGyHAguC1yRB6WisIvbviW9bMdOFUq45e0P4e1qrjG-qbATYTJUvdY04KIzxYw2sTUVsIUzQIdGUZKteqUSCBotovEqA8kkKUGbkVGv-HveQ3Ry_KQN702PMncVephRsiuWJnzpieiiNJgec8kWVLlKjUNdlFSm64xy3cibtKJ9hG2LxLv6Qnri00FjJA2zyd4mwuRJ-3McmLptp8cEITNSR4BRjktNuLpxStyHTAzggI9W8sKJ5n7zLwecMMFPPI4zHzp9tSnsqYnmEX-JOO3t-4ZXFA",
//       "expirationTime": 1692119070722
//   },
//   "createdAt": "1692114383337",
//   "lastLoginAt": "1692115470743",
//   "apiKey": "AIzaSyDzmtP9lcSg95NG28Ra0iUym3OL30KNfzs",
//   "appName": "[DEFAULT]"
// }

// { signup
//   "uid": "gr8rCFMGbEeLGE2wbhfELbFyGp42",
//   "email": "mehran@gmail.com",
//   "emailVerified": false,
//   "isAnonymous": false,
//   "providerData": [
//       {
//           "providerId": "password",
//           "uid": "mehran@gmail.com",
//           "displayName": null,
//           "email": "mehran@gmail.com",
//           "phoneNumber": null,
//           "photoURL": null
//       }
//   ],
//   "stsTokenManager": {
//       "refreshToken": "AMf-vBy5trbp3M68CHDTk-YbzkyN2He9NFrl7Pn8e272494A2IV6U7__RNwKsACR7sgnpo1nOv_ME0njxEN-F62i327V0VfjoUQZloELri3UPKyaB8UAj4tFn0hbyuezHanXRg07SDcY_F3NRXW_-EpUsUoSZsR2Qlj6B3J4duRHGxaRiP-Xrb7Fp4a2vYsavAUkUre06R7QwqDgYFO4cfxusFeEPfmxwQ",
//       "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjYzODBlZjEyZjk1ZjkxNmNhZDdhNGNlMzg4ZDJjMmMzYzIzMDJmZGUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2FmZWhlcml0LTQzMWM0IiwiYXVkIjoic2FmZWhlcml0LTQzMWM0IiwiYXV0aF90aW1lIjoxNjkyMTE1NjE1LCJ1c2VyX2lkIjoiZ3I4ckNGTUdiRWVMR0Uyd2JoZkVMYkZ5R3A0MiIsInN1YiI6ImdyOHJDRk1HYkVlTEdFMndiaGZFTGJGeUdwNDIiLCJpYXQiOjE2OTIxMTU2MTUsImV4cCI6MTY5MjExOTIxNSwiZW1haWwiOiJtZWhyYW5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIm1laHJhbkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.JH9Y01i2dR640t7yeZPondMdCASRxjyWkGNg75G7P0nKh4NtLLovxJS95XgAcCoI_-mCd_DmSkMjRbnKGjG7eFs43ofsOREMrF8Qqn2e_6aJqmivUj_3MwKDASy-xFMJVPClb1bQYeBlWG9VRp6dRWs-meghRfMlk2--SXcQ2nO28c_Lh-SHipJ84MV4SLHqw_EG47-qr5lKc8ZDod-ZmRB_YtPTISqDPOSuAG5fvCUJYJaCUZ2lkdfoqv04L4zHtYKpKa6hbQPMMgDBvefG4lYbXZ0XINKJWdYzjHIOo84ylqKG28BxJ5QKjRKpQgGSmcfioOjvVxxtpWU0TN8JUA",
//       "expirationTime": 1692119215674
//   },
//   "createdAt": "1692115615554",
//   "lastLoginAt": "1692115615554",
//   "apiKey": "AIzaSyDzmtP9lcSg95NG28Ra0iUym3OL30KNfzs",
//   "appName": "[DEFAULT]"
// }

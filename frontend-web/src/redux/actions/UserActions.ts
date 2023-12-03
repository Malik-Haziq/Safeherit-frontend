import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth"
import { auth } from "../../firebase"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { setToken } from "../reducers/UserSlice"
import {
  GET,
  PUT,
  jsonToFormData,
  GET_USER,
  DELETE,
  POST,
  CREATE_USER,
  PULSE_CHECK,
  PUBLIC_KEY,
  CREATE_PAYMENT_SESSION,
  CREATE_PAYMENT_SESSION_PORTAL,
} from "@/common"

export const login = createAsyncThunk(
  "login",
  async (
    Data: { email: string; password: string },
    { dispatch, rejectWithValue },
  ) => {
    const { email, password } = Data
    try {
      let response = await signInWithEmailAndPassword(auth, email, password)
      let token = await response.user.getIdToken()
      dispatch(setToken(token))
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const loginWithGoogle = createAsyncThunk(
  "loginWithGoogle",
  async (
    Data: {},
    { dispatch, rejectWithValue },
  ) => {
    try {
      let response = await signInWithPopup(auth, new GoogleAuthProvider());
      let token = await response.user.getIdToken()
      dispatch(setToken(token))
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const signup = createAsyncThunk(
  "signup",
  async (
    Data: { email: string; password: string },
    { dispatch, rejectWithValue },
  ) => {
    const { email, password } = Data
    try {
      let response = await createUserWithEmailAndPassword(auth, email, password)
      let token = await response.user.getIdToken()
      dispatch(setToken(token))
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const logout = createAsyncThunk(
  "logout",
  async (Data: {}, { rejectWithValue }) => {
    try {
      let response = await signOut(auth)
      sessionStorage.clear()
      localStorage.clear()
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const resetPassword = createAsyncThunk(
  "resetPassword",
  async (Data: { email: string }, { rejectWithValue }) => {
    const { email } = Data
    try {
      let response = await sendPasswordResetEmail(auth, email)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const getUser = createAsyncThunk(
  "getUser",
  async (Data: {}, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: { token: any } }
    const params = { ROUTE: GET_USER, Body: {}, token: user.token }
    try {
      let response = await GET(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const updateUser = createAsyncThunk(
  "updateUser",
  async (Data: {}, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: { token: any } }
    let formData = jsonToFormData(Data)
    const params = { ROUTE: GET_USER, Body: formData, token: user.token }
    try {
      let response = await PUT(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (Data: {}, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: { token: any } }
    const params = { ROUTE: GET_USER, Body: {}, token: user.token }
    try {
      let response = await DELETE(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const createUser = createAsyncThunk(
  "createUser",
  async (Data: {}, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: { token: any } }
    let formData = jsonToFormData(Data)
    const params = { ROUTE: CREATE_USER, Body: formData, token: user.token }
    try {
      let response = await POST(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const updatePulse = createAsyncThunk(
  "updatePulse",
  async (Data: {}, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: { token: any } }
    let formData = jsonToFormData(Data)
    const params = { ROUTE: PULSE_CHECK, Body: formData, token: user.token }
    try {
      let response = await PUT(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const updatePK = createAsyncThunk(
  "updatePK",
  async (Data: {}, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: { token: any } }
    let formData = jsonToFormData(Data)
    const params = { ROUTE: PUBLIC_KEY, Body: formData, token: user.token }
    try {
      let response = await PUT(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const createPayment = createAsyncThunk(
  "createPayment",
  async (Data: {subscriptionType: string}, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: { token: any } }
    let formData = jsonToFormData(Data)
    const params = { ROUTE: CREATE_PAYMENT_SESSION, Body: formData, token: user.token }
    try {
      let response = await POST(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const updatePayment = createAsyncThunk(
  "updatePayment",
  async (Data: {}, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: { token: any } }
    const params = { ROUTE: CREATE_PAYMENT_SESSION_PORTAL, Body: {}, token: user.token }
    try {
      let response = await GET(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)
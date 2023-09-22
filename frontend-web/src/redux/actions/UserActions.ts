import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth"
import { auth } from "../../firebase"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { setToken } from "../reducers/UserSlice";
import { GET, PUT, jsonToFormData } from "../../common"
import { GET_USER } from "../../common/api/routes"

export const login = createAsyncThunk(
  "login",
  async (Data: { email: string; password: string }, {dispatch, rejectWithValue }) => {
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

export const signup = createAsyncThunk(
  "signup",
  async (Data: { email: string; password: string }, {dispatch,  rejectWithValue }) => {
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
  async (Data: {}, {getState, rejectWithValue }) => {
    const { user } = getState() as { user: {token: any} };
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
    const { user } = getState() as { user: {token: any} };
    let formData = jsonToFormData(Data)
    const params = { ROUTE: GET_USER, Body: formData, token: user.token  }
    try {
      let response = await PUT(params)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)
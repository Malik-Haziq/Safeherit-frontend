import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth"
import { auth } from "../../firebase"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const login = createAsyncThunk(
  "login",
  async (Data: { email: string; password: string }, { rejectWithValue }) => {
    const { email, password } = Data
    try {
      let response = await signInWithEmailAndPassword(auth, email, password)
      localStorage.setItem("access", Object.values(response.user)[Object.keys(response.user).indexOf("stsTokenManager")].accessToken)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const signup = createAsyncThunk(
  "signup",
  async (Data: { email: string; password: string }, { rejectWithValue }) => {
    const { email, password } = Data
    try {
      let response = await createUserWithEmailAndPassword(auth, email, password)
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

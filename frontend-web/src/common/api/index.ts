import axios from "axios"
import { store } from "@/redux";
import { showToast } from "@/redux/reducers/ToastSlice";

export const API = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_SERVER,
  // timeout: 1000,
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data"
  },
})

const GET = async (DATA: { ROUTE: string; Body: {}, token: string }) => {
  const { ROUTE, Body, token } = DATA
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  try {
    const response = await API.get(ROUTE, Body)
    return response
  } catch (error) {
    _handleErrors(error)
    throw error
  }
}

const POST = async (DATA: { ROUTE: string; Body: {}, token: string }) => {
  const { ROUTE, Body, token } = DATA
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  try {
    const response = await API.post(ROUTE, Body)
    return response
  } catch (error) {
    _handleErrors(error)
    throw error
  }
}

const PUT = async (DATA: { ROUTE: string; Body: {}, token: string }) => {
  const { ROUTE, Body, token } = DATA
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  try {
    const response = await API.put(ROUTE, Body)
    return response
  } catch (error) {
    _handleErrors(error)
    throw error
  }
}

const PATCH = () => {
  try {
  } catch (error) {
    _handleErrors(error)
    throw error
  }
}

const DELETE = async (DATA: { ROUTE: string; Body: {}, token: string }) => {
  const { ROUTE, Body, token } = DATA
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  try {
    const response = await API.delete(ROUTE, Body)
    return response
  } catch (error) {
    _handleErrors(error)
    throw error
  }
}

const _handleErrors = (error: any) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    store.dispatch(showToast({ message: error?.response?.data?.message, variant: "error" }))
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    store.dispatch(showToast({ message: error.request, variant: "error" }))
  } else {
    // Something happened in setting up the request that triggered an Error
    store.dispatch(showToast({ message: error.message, variant: "error" }))
  }
}

export { GET, POST, PUT, PATCH, DELETE }

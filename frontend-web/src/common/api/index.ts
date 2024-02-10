import axios from "axios"
import { toast } from "@/components"

export const API = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_SERVER,
  withCredentials: true, // send cookies when cross-domain requests
  // timeout: 1000,
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
})

const GET = async (DATA: { ROUTE: string; Body: object }) => {
  const { ROUTE, Body } = DATA
  try {
    const response = await API.get(ROUTE, Body)
    return response
  } catch (error) {
    _handleErrors(error)
    throw error
  }
}

const POST = async (DATA: { ROUTE: string; Body: object }) => {
  const { ROUTE, Body } = DATA
  try {
    const response = await API.post(ROUTE, Body)
    return response
  } catch (error) {
    _handleErrors(error)
    throw error
  }
}

const PUT = async (DATA: { ROUTE: string; Body: object }) => {
  const { ROUTE, Body } = DATA
  try {
    const response = await API.put(ROUTE, Body)
    return response
  } catch (error) {
    _handleErrors(error)
    throw error
  }
}

// const PATCH = () => {
//   try {
//     /* empty */
//   } catch (error) {
//     _handleErrors(error)
//     throw error
//   }
// }

const DELETE = async (DATA: { ROUTE: string; Body?: object }) => {
  const { ROUTE, Body } = DATA
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
    if (error?.response?.data?.message == "Unauthorized") {
      toast("Please login again to continue", "error")
      localStorage.clear()
      setTimeout(() => {
        window.location.reload()
      }, 5000)
    } else {
      toast(error?.response?.data?.message, "error")
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    toast(error.request, "error")
  } else {
    // Something happened in setting up the request that triggered an Error
    toast(error.message, "error")
  }
}

export { GET, POST, PUT, DELETE }

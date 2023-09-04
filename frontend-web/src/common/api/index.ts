import axios from "axios"
const access = localStorage.getItem("access")

const API = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_SERVER,
  // timeout: 1000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${access}`,
  },
})

const GET = async (DATA: { ROUTE: string; Body: {} }) => {
  const { ROUTE, Body } = DATA
  try {
    return API.get(ROUTE, Body)
  } catch (error) {
    _handleErrors(error)
  }
}

const POST = async (DATA: { ROUTE: string; Body: {} }) => {
  const { ROUTE, Body } = DATA
  try {
    return API.post(ROUTE, Body)
  } catch (error) {
    _handleErrors(error)
  }
}

const PUT = async (DATA: { ROUTE: string; Body: {} }) => {
  const { ROUTE, Body } = DATA
  try {
    return API.put(ROUTE, Body)
  } catch (error) {
    _handleErrors(error)
  }
}

const PATCH = () => {
  try {
  } catch (error) {
    _handleErrors(error)
  }
}

const DELETE = async (DATA: { ROUTE: string; Body: {} }) => {
  const { ROUTE, Body } = DATA
  try {
    return API.delete(ROUTE, Body)
  } catch (error) {
    _handleErrors(error)
  }
}

const _handleErrors = (error: any) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    alert(error?.response?.data)
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    alert(error?.request)
    console.log(error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    alert(error?.message)
    console.log("Error", error.message)
  }
}

export { GET, POST, PUT, PATCH, DELETE }

import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_SERVER,
  // timeout: 1000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer test`,
  },
});

const GET = async (DATA: {ROUTE: string, Body: {}}) => {
  const {ROUTE, Body} = DATA
  try {
    return API.get(ROUTE, Body)
  } catch (error) {
    _handleErrors(error)
  }
}

const POST = (DATA: {ROUTE: string, Body: {}}) => {
  try {
    
  } catch (error) {
    _handleErrors(error)
  }
}

const PUT = () => {
  try {
    
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

const DELETE = () => {
  try {
    
  } catch (error) {
    _handleErrors(error)
  }
}

const _handleErrors = (error: any) => {

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
}

export { GET, POST, PUT, PATCH, DELETE }
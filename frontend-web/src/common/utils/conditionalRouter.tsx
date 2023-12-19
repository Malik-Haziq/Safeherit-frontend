import React from 'react'
import { Navigate, Outlet } from "react-router-dom"
import { ROUTE_CONSTANTS } from ".."
import { useAppSelector } from "@redux/hooks"
import Encryption from "../encryption/encryption"

export const ProtectedRoutes = (_props: {
  page: string
}) => {

  const encryptionService = new Encryption()
  const user = useAppSelector(state => state.user)

  const active = user.active
  const role = user.role
  const paymentStatus = user.paymentStatus
  const publicKey = user.publicKey
  const privateKey = sessionStorage.getItem("privateKey") || ''

  let redirectTo: string = ROUTE_CONSTANTS.LOGIN

  switch (_props.page) {
    case "price": {
      redirectTo = ROUTE_CONSTANTS.LOGIN
      return active && role == "owner" && (!paymentStatus || paymentStatus == "Pending") ? <Outlet /> : <Navigate to={redirectTo} replace />
      break;
    }
    case "register-pk": {
      redirectTo = ROUTE_CONSTANTS.LOGIN
      return active && role != "validator" && role != "super-admin" && role != "admin" && privateKey == '' && paymentStatus !== "Pending" ? <Outlet /> : <Navigate to={redirectTo} replace />
      break;
    }
    case "registration": {
      redirectTo = ROUTE_CONSTANTS.DASHBOARD
      return !active && (!role || role == "none") ? <Outlet /> : <Navigate to={redirectTo} replace />
      break;
    }
    case "dashboard": {
      redirectTo = (!paymentStatus || paymentStatus == "Pending") ? ROUTE_CONSTANTS.PRICING : ROUTE_CONSTANTS.REGISTER_KEY
      const isValidKey = encryptionService.validateKeyPair(publicKey, privateKey)
      return isValidKey || role == "validator" || role == "admin" || role == "super-admin" ? <Outlet /> : <Navigate to={redirectTo} replace />
      break;
    }
    case "dashboard-owner": {
      redirectTo = ROUTE_CONSTANTS.DASHBOARD
      return role == "owner" ? <Outlet /> : <Navigate to={redirectTo} replace />
      break;
    }
    case "dashboard-beneficiary": {
      redirectTo = ROUTE_CONSTANTS.DASHBOARD
      return role == "owner" || role == "beneficiary" ? <Outlet /> : <Navigate to={redirectTo} replace />
      break;
    }
    case "dashboard-admin": {
      redirectTo = ROUTE_CONSTANTS.DASHBOARD
      return role == "admin" || role == "super-admin" ? <Outlet /> : <Navigate to={redirectTo} replace />
      break;
    }
    default: {
      return <Navigate to={redirectTo} replace />
    }
  }
}

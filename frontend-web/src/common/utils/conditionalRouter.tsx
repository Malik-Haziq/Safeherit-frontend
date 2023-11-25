import { Navigate, Outlet } from "react-router-dom"
import { ROUTE_CONSTANTS } from ".."
import { useAppSelector } from "@redux/hooks"
import Encryption from "../encryption/encryption"

export const ProtectedRoute = () => {
  const active = useAppSelector(state => state.user.active)
  const ifActive: boolean = active ? true : false
  const redirectTo: string = ROUTE_CONSTANTS.LOGIN
  return ifActive ? <Outlet /> : <Navigate to={redirectTo} replace />
}

export const ProtectedRegisterationRoute = () => {
  const active = useAppSelector(state => state.user.active)
  const role = useAppSelector(state => state.user.role)
  const ifActive: boolean = active ? true : false
  const redirectTo: string = ROUTE_CONSTANTS.DASHBOARD
  return !ifActive && (!role || role == "none")? <Outlet /> : <Navigate to={redirectTo} replace />
}

export const ProtectedPricingRoute = () => {
  const active = useAppSelector(state => state.user.active)
  const role = useAppSelector(state => state.user.role)
  const ifActive: boolean = active ? true : false
  const redirectTo: string = ROUTE_CONSTANTS.DASHBOARD
  return ifActive && role !== "beneficiary" && role !== "validator" ? <Outlet /> : <Navigate to={redirectTo} replace />
}

export const ProtectedRegisterKeyRoute = () => {
  const privateKey = sessionStorage.getItem("privateKey") || ''
  const active = useAppSelector(state => state.user.active)
  const role = useAppSelector(state => state.user.role)
  const ifActive: boolean = active ? true : false
  const redirectTo: string = ROUTE_CONSTANTS.DASHBOARD
  return ifActive && role != "validator" && privateKey == '' ? <Outlet /> : <Navigate to={redirectTo} replace />
}

export const ProtectedEncryptionRoute = () => {
  const privateKey = sessionStorage.getItem("privateKey") || ''
  const publicKey = useAppSelector(state => state.user.publicKey)
  const userRole = useAppSelector(state => state.user.role)
  let redirectTo: string = ROUTE_CONSTANTS.REGISTER_KEY
  const encryptionService = new Encryption()
  const isValidKey = encryptionService.validateKeyPair(publicKey, privateKey)
  return isValidKey || userRole == "validator" ? <Outlet /> : <Navigate to={redirectTo} replace />
}

export const ProtectedOwnerRoutes = () => {
  const role = useAppSelector(state => state.user.role)
  const redirectTo: string = ROUTE_CONSTANTS.DASHBOARD
  if (role == "owner") {
    return <Outlet />
  }
  else {
    return <Navigate to={redirectTo} replace />
  }
}

export const ProtectedOwnerAndBeneficiaryRoutes = () => {
  const role = useAppSelector(state => state.user.role)
  const redirectTo: string = ROUTE_CONSTANTS.DASHBOARD
  if (role == "owner" || role == "beneficiary") {
    return <Outlet />
  }
  else {
    return <Navigate to={redirectTo} replace />
  }
}

export const ProtectedAdminRoutes = () => {
  const role = useAppSelector(state => state.user.role)
  const redirectTo: string = ROUTE_CONSTANTS.DASHBOARD
  if (role == "admin" || role == "super-admin") {
    return <Outlet />
  }
  else {
    return <Navigate to={redirectTo} replace />
  }
}
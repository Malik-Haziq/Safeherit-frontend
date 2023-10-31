import { Navigate, Outlet } from "react-router-dom"
import { ROUTE_CONSTANTS } from ".."
import { useAppSelector } from "@redux/hooks"

export const ProtectedRoute = () => {
  const active = useAppSelector(state => state.user.active)
  const ifActive: boolean = active ? true : false
  const redirectTo: string = ROUTE_CONSTANTS.LOGIN
  return ifActive ? <Outlet /> : <Navigate to={redirectTo} replace />
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
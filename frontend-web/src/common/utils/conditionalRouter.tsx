import { Navigate, Outlet } from "react-router-dom"
import { ROUTE_CONSTANTS } from ".."
import { auth } from "../../firebase"

export const ProtectedRoute = () => {
  const isLoggedIn: boolean = window.localStorage.getItem("user") ? true : false
  const redirectTo: string = ROUTE_CONSTANTS.LOGIN
  return isLoggedIn ? <Outlet /> : <Navigate to={redirectTo} replace />
}
// TODO make sure that check at line 12 is being validated from server before returning authenticated route
export const ProtectedRegisterationRoute = () => {
  const isLoggedIn: boolean = window.localStorage.getItem("user") ? true : false
  const redirectTo: string = ROUTE_CONSTANTS.DASHBOARD
  return isLoggedIn ? <Navigate to={redirectTo} replace /> : <Outlet />
}

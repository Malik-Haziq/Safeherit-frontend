import { Navigate, Outlet } from "react-router-dom"
import { ROUTE_CONSTANTS } from ".."
import { useAppSelector } from "../../redux/hooks"

export const ProtectedRoute = () => {
  const active = useAppSelector(state => state.user.active)
  const ifActive: boolean = active ? true : false
  const redirectTo: string = ROUTE_CONSTANTS.LOGIN
  return ifActive ? <Outlet /> : <Navigate to={redirectTo} replace />
}
// TODO make sure that check at line 12 is being validated from server before returning authenticated route
export const ProtectedRegisterationRoute = () => {
  const active = useAppSelector(state => state.user.active)
  const ifActive: boolean = active ? true : false
  const redirectTo: string = ROUTE_CONSTANTS.DASHBOARD
  return ifActive ? <Navigate to={redirectTo} replace /> : <Outlet />
}

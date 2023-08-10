import { FunctionComponent } from "react"
import { Navigate } from "react-router-dom"
import { ROUTE_CONSTANTS } from ".."

/** A higher-order component with conditional routing logic */
export function withCondition(
  Component: FunctionComponent,
  condition: boolean,
  redirectTo: string,
) {
  return function InnerComponent(props: any) {
    return condition ? (
      <Component {...props} />
    ) : (
      <Navigate to={redirectTo} replace />
    )
  }
}

export const withLoggedIn = (Component: React.FunctionComponent) => {
  // TODO: add correct logic for is logged in
  const isLoggedIn: boolean = true
  const redirectTo: string = ROUTE_CONSTANTS.LOGIN
  return withCondition(Component, isLoggedIn, redirectTo)
}

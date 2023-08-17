import { withLoggedIn } from "./common"
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom"
import { Login, SignUp, Dashboard, Pricing, RegisterKey } from "./pages"
import { ROUTE_CONSTANTS } from "./common"
import { NavBar } from "./components"

function App() {
  const AuthDashboard = withLoggedIn(Dashboard)
  const AuthPaymentPlan = withLoggedIn(Pricing)
  // TODO authenticate on signup only | not on login

  return (
    // TODO: add suspense with loading fallback to handle loading time delays.
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBarLayout />}>
          <Route path={ROUTE_CONSTANTS.SIGN_UP} element={<SignUp />} />
          <Route path={ROUTE_CONSTANTS.PRICING} element={<AuthPaymentPlan />} />
          <Route
            path={ROUTE_CONSTANTS.REGISTER_KEY}
            element={<RegisterKey />}
          />
          <Route
            path="*"
            element={<Navigate to={ROUTE_CONSTANTS.HOME} replace />}
          />
        </Route>

        <Route path={ROUTE_CONSTANTS.LOGIN} element={<Login />} />
        <Route path={ROUTE_CONSTANTS.DASHBOARD} element={<AuthDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

function NavBarLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}

export default App

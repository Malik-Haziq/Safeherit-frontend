import React, { useEffect, useState } from "react"
import { ProtectedRoutes } from "./common"
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom"
import { Login, SignUp, Home, About, Contact } from "./pages"
import { ROUTE_CONSTANTS } from "./common"
import { NavBar, Spinner } from "./components"
import { lazy } from "react"
import { CustomAppToast, CustomToast } from "./components/customToast"
import { useAppDispatch, useAppSelector } from "./redux/hooks"
import { getUser } from "./redux/actions"
import Dashboard from "./pages/dashboard/Dashboard"
import DashboardControl from "./pages/dashboard/views/dashboardControl/DashboardControl"
import HelpView from "./pages/dashboard/views/help/HelpView"
import BeneficiariesView from "./pages/dashboard/views/beneficiary/BeneficiariesView"
import ValidatorsView from "./pages/dashboard/views/validator/ValidatorsView"
import PulseView from "./pages/dashboard/views/pulse/PulseView"
import AccountView from "./pages/dashboard/views/account/AccountView"
import AssetsView from "./pages/dashboard/views/asset/AssetsView"
import SettingView from "./pages/dashboard/views/setting/SettingView"

const Pricing = lazy(() => import("./pages/pricing/Pricing"))
const RegisterKey = lazy(() => import("./pages/register-key/RegisterKey"))

function App() {
  const loader = useAppSelector((state) => state.loader)
  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const [fetchingData, setFetchingData] = useState(true)

  useEffect(() => {
    try {
      dispatch<any>(getUser({ MuteToast: true }))
        .unwrap()
        .finally(() => {
          setFetchingData(false)
        })
    } catch (error) {
      console.log("User not logged in")
    }
  }, [])

  return fetchingData ? (
    <Spinner withOverlay={true} />
  ) : (
    <>
      {user.role != "none" ? <CustomToast /> : <CustomAppToast />}
      {loader.loaderVisibility && <Spinner withOverlay={true} />}
      <AppRoutes />
    </>
  )
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBarLayout />}>
          <Route path={""} element={<Home />} />

          <Route path={ROUTE_CONSTANTS.ABOUT} element={<About />} />
          <Route path={ROUTE_CONSTANTS.CONTACT} element={<Contact />} />

          <Route element={<ProtectedRoutes page="price" />}>
            <Route path={ROUTE_CONSTANTS.PRICING} element={<Pricing />} />
          </Route>

          <Route element={<ProtectedRoutes page="register-pk" />}>
            <Route
              path={ROUTE_CONSTANTS.REGISTER_KEY}
              element={<RegisterKey />}
            />
          </Route>

          <Route element={<ProtectedRoutes page="registration" />}>
            <Route path={ROUTE_CONSTANTS.SIGN_UP} element={<SignUp />} />
          </Route>

          <Route
            path="*"
            element={<Navigate to={ROUTE_CONSTANTS.HOME} replace />}
          />
        </Route>

        <Route element={<ProtectedRoutes page="registration" />}>
          <Route path={ROUTE_CONSTANTS.LOGIN} element={<Login />} />
        </Route>

        <Route element={<ProtectedRoutes page="dashboard" />}>
          <Route path={ROUTE_CONSTANTS.DASHBOARD} element={<Dashboard />}>
            <Route path="" element={<DashboardControl />} />
            <Route
              path={ROUTE_CONSTANTS.DASHBOARD_HELP}
              element={<HelpView />}
            />

            <Route element={<ProtectedRoutes page="dashboard-owner" />}>
              <Route
                path={ROUTE_CONSTANTS.DASHBOARD_BENEFICIARIES}
                element={<BeneficiariesView />}
              />
              <Route
                path={ROUTE_CONSTANTS.DASHBOARD_VALIDATORS}
                element={<ValidatorsView />}
              />
              <Route
                path={ROUTE_CONSTANTS.DASHBOARD_PULSE}
                element={<PulseView />}
              />
              <Route
                path={ROUTE_CONSTANTS.DASHBOARD_ACCOUNT}
                element={<AccountView />}
              />
            </Route>

            <Route element={<ProtectedRoutes page="dashboard-beneficiary" />}>
              <Route
                path={ROUTE_CONSTANTS.DASHBOARD_ASSETS}
                element={<AssetsView />}
              />
            </Route>

            <Route element={<ProtectedRoutes page="dashboard-admin" />}>
              <Route
                path={ROUTE_CONSTANTS.DASHBOARD_SETTINGS}
                element={<SettingView />}
              />
            </Route>
          </Route>
        </Route>
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

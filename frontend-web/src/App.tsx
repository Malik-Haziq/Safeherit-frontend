import React, { useEffect, useState } from "react"
import { ProtectedRoutes, WizardProtectedRoutes } from "./common"
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
import { CustomToast } from "./components/customToast"
import { useAppDispatch, useAppSelector } from "./redux/hooks"
import { authenticateSession, getUser } from "./redux/actions"
import Dashboard from "./pages/dashboard/Dashboard"
import DashboardControl from "./pages/dashboard/views/dashboardControl/DashboardControl"
import HelpView from "./pages/dashboard/views/help/HelpView"
import BeneficiariesView from "./pages/dashboard/views/beneficiary/BeneficiariesView"
import ValidatorsView from "./pages/dashboard/views/validator/ValidatorsView"
import PulseView from "./pages/dashboard/views/pulse/PulseView"
import AccountView from "./pages/dashboard/views/account/AccountView"
import AssetsView from "./pages/dashboard/views/asset/AssetsView"
import SettingView from "./pages/dashboard/views/setting/SettingView"
import RequestsView from "./pages/dashboard/views/requests/RequestsView"

const Pricing = lazy(() => import("./pages/pricing/Pricing"))
const RegisterKey = lazy(() => import("./pages/register-key/RegisterKey"))

function App() {
  const loader = useAppSelector((state) => state.loader)
  const dispatch = useAppDispatch()
  const [fetchingData, setFetchingData] = useState(true)

  useEffect(() => {
    dispatch<any>(authenticateSession({}))
      .unwrap()
      .then((response: { data: { data: { isSessionActive: boolean } } }) => {
        if (response.data.data.isSessionActive) {
          dispatch<any>(getUser({}))
            .unwrap()
            .finally(() => {
              setFetchingData(false)
            })
            .catch()
        } else {
          setFetchingData(false)
          localStorage.clear()
        }
      })
  }, [])

  return fetchingData ? (
    <Spinner withOverlay={true} />
  ) : (
    <>
      {<CustomToast />}
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
            <Route element={<WizardProtectedRoutes />}>
              <Route path="" element={<DashboardControl />} />
              <Route
                path={ROUTE_CONSTANTS.DASHBOARD_HELP}
                element={<HelpView />}
              />
            </Route>

            <Route element={<ProtectedRoutes page="dashboard-owner" />}>
              <Route element={<WizardProtectedRoutes />}>
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
            </Route>
            <Route element={<ProtectedRoutes page="dashboard-beneficiary" />}>
              <Route element={<WizardProtectedRoutes />}>
                <Route
                  path={ROUTE_CONSTANTS.DASHBOARD_ASSETS}
                  element={<AssetsView />}
                />
              </Route>
            </Route>

            <Route element={<ProtectedRoutes page="dashboard-admin" />}>
              <Route
                path={ROUTE_CONSTANTS.DASHBOARD_REQUESTS}
                element={<RequestsView />}
              />
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

import {
  ProtectedRoute,
  ProtectedOwnerRoutes,
  ProtectedOwnerAndBeneficiaryRoutes,
  ProtectedAdminRoutes,
  ProtectedEncryptionRoute
} from "./common"
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
import { useAppSelector } from "./redux/hooks"

const Pricing = lazy(() => import("./pages/pricing/Pricing"))
const RegisterKey = lazy(() => import("./pages/register-key/RegisterKey"))
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"))
const AssetsView = lazy(
  () => import("./pages/dashboard/views/asset/AssetsView"),
)
const DashboardControl = lazy(
  () => import("./pages/dashboard/views/dashboardControl/DashboardControl"),
)
const BeneficiariesView = lazy(
  () => import("./pages/dashboard/views/beneficiary/BeneficiariesView"),
)
const PulseView = lazy(() => import("./pages/dashboard/views/pulse/PulseView"))
const ValidatorsView = lazy(
  () => import("./pages/dashboard/views/validator/ValidatorsView"),
)
const AccountView = lazy(
  () => import("./pages/dashboard/views/account/AccountView"),
)
const HelpView = lazy(() => import("./pages/dashboard/views/help/HelpView"))
const SettingView = lazy(() => import("./pages/dashboard/views/setting/SettingView"))

function App() {
  const loader = useAppSelector(state => state.loader)
  return (
    // TODO: add suspense with loading fallback to handle loading time delays.
    <>
      <CustomToast/>
      { loader.loaderVisibility && <Spinner withOverlay={true}/> }
      <AppRoutes />
    </>
  )
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBarLayout />}>
          <Route element={<ProtectedRoute />}>
            {/* TODO validator should not be able to see this page*/}
            <Route path={ROUTE_CONSTANTS.PRICING} element={<Pricing />} />
            <Route path={ROUTE_CONSTANTS.ABOUT} element={<About />} />
            <Route path={ROUTE_CONSTANTS.CONTACT} element={<Contact />} />
            <Route path={''} element={<Home />} />
            {/* TODO validator & beneficiary should not be able to see this page*/}
            <Route path={ROUTE_CONSTANTS.REGISTER_KEY} element={<RegisterKey />} />
          </Route>
          <Route path={ROUTE_CONSTANTS.SIGN_UP} element={<SignUp />} />
          <Route path="*" element={<Navigate to={ROUTE_CONSTANTS.HOME} replace />} />
        </Route>

        <Route path={ROUTE_CONSTANTS.LOGIN} element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedEncryptionRoute />}>
            <Route path={ROUTE_CONSTANTS.DASHBOARD} element={<Dashboard />}>
              <Route path="" element={<DashboardControl />} />
              <Route
                path={ROUTE_CONSTANTS.DASHBOARD_HELP}
                element={<HelpView />}
              />
              <Route element={<ProtectedOwnerRoutes />}>
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
              <Route element={<ProtectedOwnerAndBeneficiaryRoutes />}>
                <Route
                  path={ROUTE_CONSTANTS.DASHBOARD_ASSETS}
                  element={<AssetsView />}
                />
              </Route>
              <Route element={<ProtectedAdminRoutes />}>
                <Route
                  path={ROUTE_CONSTANTS.DASHBOARD_SETTINGS}
                  element={<SettingView />}
                />
              </Route>
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

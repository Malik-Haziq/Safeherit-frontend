import { withLoggedIn } from "./common";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Login, SignUp, Dashboard, Pricing } from "./pages";
import { ROUTE_CONSTANTS } from "./common";

function App() {

  const AuthDashboard = withLoggedIn(Dashboard);
  const AuthPaymentPlan = withLoggedIn(Pricing);
  // TODO authenticate on signup only | not on login

  return (
    // TODO: add suspense with loading fallback to handle loading time delays.
    <BrowserRouter>
      <Routes>
        {/* Global Routes */}
        <Route path={ROUTE_CONSTANTS.LOGIN} element={<Login />} />
        <Route path={ROUTE_CONSTANTS.SIGN_UP} element={<SignUp />} />

        {/* Protected Routes */}
        <Route path={ROUTE_CONSTANTS.DASHBOARD} element={<AuthDashboard />} />
        <Route path={ROUTE_CONSTANTS.PRICING} element={<AuthPaymentPlan />} />

        {/* Default Route */}
        <Route path="*" element={<Navigate to={ROUTE_CONSTANTS.HOME} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

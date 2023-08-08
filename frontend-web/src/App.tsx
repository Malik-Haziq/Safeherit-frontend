import { withLoggedIn } from "./common";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Login, SignUp, Dashboard, Pricing } from "./pages";

function App() {

  const AuthDashboard = withLoggedIn(Dashboard)
  const AuthPaymentPlan = withLoggedIn(Pricing)

  return (
    // TODO: add suspense with loading fallback to handle loading time delays.
    <BrowserRouter>
      <Routes>
        {/* Global Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<AuthDashboard />} />
        <Route path="/pricing" element={<AuthPaymentPlan />} />

        {/* Default Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

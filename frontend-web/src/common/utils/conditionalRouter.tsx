import React from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { ROUTE_CONSTANTS } from ".."
import { useAppSelector } from "@redux/hooks"
import Encryption from "../encryption/encryption"

export const ProtectedRoutes = (_props: { page: string }) => {
  const encryptionService = new Encryption()
  const user = useAppSelector((state) => state.user)

  const role = user.role
  const paymentStatus = user.paymentStatus
  const publicKey = user.publicKey
  const _privateKey = localStorage.getItem("privateKey")
  const privateKey = _privateKey
    ? encryptionService.decryptKeys(_privateKey, user.uid)
    : ""

  let redirectTo: string = ROUTE_CONSTANTS.LOGIN

  switch (_props.page) {
    case "price": {
      redirectTo = ROUTE_CONSTANTS.LOGIN
      return role == "owner" && user.isOwner && paymentStatus == "Pending" ? (
        <Outlet />
      ) : (
        <Navigate to={redirectTo} replace />
      )
      break
    }
    case "register-pk": {
      redirectTo = ROUTE_CONSTANTS.LOGIN
      return role != "validator" &&
        role != "super-admin" &&
        role != "admin" &&
        privateKey == "" &&
        paymentStatus !== "Pending" ? (
        <Outlet />
      ) : (
        <Navigate to={redirectTo} replace />
      )
      break
    }
    case "registration": {
      redirectTo = ROUTE_CONSTANTS.DASHBOARD
      return !role || role == "none" ? (
        <Outlet />
      ) : (
        <Navigate to={redirectTo} replace />
      )
      break
    }
    case "dashboard": {
      redirectTo =
        !paymentStatus || paymentStatus == "Pending"
          ? ROUTE_CONSTANTS.PRICING
          : ROUTE_CONSTANTS.REGISTER_KEY

      const isValidKey = encryptionService.validateKeyPair(
        publicKey,
        privateKey,
      )
      return isValidKey ||
        role == "validator" ||
        role == "admin" ||
        role == "super-admin" ? (
        <Outlet />
      ) : (
        <Navigate to={redirectTo} replace />
      )
      break
    }
    case "dashboard-owner": {
      redirectTo = ROUTE_CONSTANTS.DASHBOARD
      return role == "owner" && user.isOwner ? (
        <Outlet />
      ) : (
        <Navigate to={redirectTo} replace />
      )
      break
    }
    case "dashboard-beneficiary": {
      redirectTo = ROUTE_CONSTANTS.DASHBOARD
      return (role == "owner" || role == "beneficiary") &&
        (user.isOwner || user.isBeneficiary) ? (
        <Outlet />
      ) : (
        <Navigate to={redirectTo} replace />
      )
      break
    }
    case "dashboard-admin": {
      redirectTo = ROUTE_CONSTANTS.DASHBOARD
      return (role == "admin" || role == "super-admin") &&
        (user.isAdmin || user.isSuperAdmin) ? (
        <Outlet />
      ) : (
        <Navigate to={redirectTo} replace />
      )
      break
    }
    default: {
      return <Navigate to={redirectTo} replace />
    }
  }
}

export const WizardProtectedRoutes = () => {
  const location = useLocation()
  const currentPath = location.pathname.split('/').pop()
  const user = useAppSelector(state => state.user)
  
  let redirectTo: string | null = ''
  if(user.startupWizardCompleted) {
    redirectTo = null
  } else {
    switch (user.wizardStep) {
      case 'Assets':
        redirectTo = currentPath === 'assets' ? null : ROUTE_CONSTANTS.DASHBOARD_ASSETS
        break
      case 'Validators':
        redirectTo = currentPath === 'validators' ? null : ROUTE_CONSTANTS.DASHBOARD_VALIDATORS
        break
      case 'Beneficiary':
        redirectTo = currentPath === 'beneficiaries' ? null : ROUTE_CONSTANTS.DASHBOARD_BENEFICIARIES
        break
      case 'PulseCheck':
        redirectTo = currentPath === 'pulse' ? null : ROUTE_CONSTANTS.DASHBOARD_PULSE
        break
      case 'Dashboard':
        redirectTo = currentPath === 'dashboard' ? null : ''
        break
      case 'none':
        redirectTo = null
        break
      default:
        break
    }
  }
  if (redirectTo === null) {
    return <Outlet />
  }
  return <Navigate to={`${ROUTE_CONSTANTS.DASHBOARD}${redirectTo && `/${redirectTo}`}`} replace />
 }
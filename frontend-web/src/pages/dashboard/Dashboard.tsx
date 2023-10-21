import dashboardIcon from "@images/dashboard.svg"
import assets from "@images/assets.svg"
import beneficiaries from "@images/beneeficiaries.svg"
import validator from "@images/validarors.svg"
import pulseCheck from "@images/pulse-check.svg"
import profile from "@images/Profile.svg"
import setting from "@images/Setting.svg"

import { lazy, useState, useEffect } from "react"
import { useLocation, Outlet, useNavigate } from "react-router-dom"
import styles from "./Dashboard.module.css"
import { CONSTANT } from "@/common"
import { useAppDispatch, useAppSelector } from "@redux/hooks"
import { logout } from "@redux/actions"

const NavigationDrawer = lazy(() => import("./NavigationDrawer"))
const DashboardNavbar = lazy(() => import("./DashboardNavbar"))

type NavBarItem = {
  screen: string
  title: string
  id: string
}

export default function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user)
  const currentPath = useLocation()
  const [selectedOption, setSelectedOption] = useState(CONSTANT.DASHBOARD)
  const [selectedPath, setSelectedPath] = useState('/dashboard')
  
  useEffect(() => {
    // Remove trailing slash
    const trimmedPath = currentPath.pathname.replace(/\/$/, '')
    setSelectedPath(trimmedPath)
    setSelectedOption(navBarHeadings[trimmedPath]?.id)
  }, [currentPath])

  const ownerNavBarHeadings: Record<string, NavBarItem> = {
    "/dashboard": {
      screen: CONSTANT.DASHBOARD,
      title: CONSTANT.DASHBOARD_TITLE,
      id: CONSTANT.DASHBOARD
    },
    "/dashboard/assets": {
      screen: CONSTANT.MY_ASSETS,
      title: CONSTANT.MY_ASSETS_TITLE,
      id: CONSTANT.MY_ASSETS
    },
    "/dashboard/beneficiaries": {
      screen: CONSTANT.BENEFICIARIES,
      title: CONSTANT.BENEFICIARIES_TITLE,
      id: CONSTANT.BENEFICIARIES
    },
    "/dashboard/validators": {
      screen: CONSTANT.VALIDATORS,
      title: CONSTANT.VALIDATORS_TITLE,
      id: CONSTANT.VALIDATORS
    },
    "/dashboard/pulse": {
      screen: CONSTANT.PULSE_CHECK,
      title: CONSTANT.PULSE_CHECK_TITLE,
      id: CONSTANT.PULSE_CHECK
    },
    "/dashboard/account": {
      screen: CONSTANT.MY_ACCOUNT,
      title: CONSTANT.MY_ACCOUNT_TITLE,
      id: CONSTANT.MY_ACCOUNT
    },
    "/dashboard/help": {
      screen: CONSTANT.HELP,
      title: CONSTANT.HELP_TITLE,
      id: CONSTANT.HELP
    },
  }
  const beneficiaryNavBarHeadings: Record<string, NavBarItem> = {
    "/dashboard": {
      screen: CONSTANT.TESTAMENT,
      title: CONSTANT.TESTAMENT_TITLE,
      id: CONSTANT.TESTAMENT
    },
    "/dashboard/assets": {
      screen: CONSTANT.ASSETS,
      title: CONSTANT.ASSETS_TITLE,
      id: CONSTANT.ASSETS
    },
    "/dashboard/help": {
      screen: CONSTANT.HELP,
      title: CONSTANT.HELP_TITLE,
      id: CONSTANT.HELP
    },
  }
  const validatorNavBarHeadings: Record<string, NavBarItem> = {
    "/dashboard": {
      screen: CONSTANT.VALIDATION,
      title: CONSTANT.VALIDATION_TITLE,
      id: CONSTANT.VALIDATION
    },
    "/dashboard/help": {
      screen: CONSTANT.HELP,
      title: CONSTANT.HELP_TITLE,
      id: CONSTANT.HELP
    },
  }
  const adminNavBarHeadings: Record<string, NavBarItem> = {
    "/dashboard": {
      screen: CONSTANT.ADMIN,
      title: CONSTANT.ADMIN_TITLE,
      id: CONSTANT.ADMIN
    },
    "/dashboard/setting": {
      screen: CONSTANT.SETTINGS,
      title: CONSTANT.SETTINGS_TITLE,
      id: CONSTANT.SETTINGS
    },
  }
  const superAdminNavBarHeadings: Record<string, NavBarItem> = {
    "/dashboard": {
      screen: CONSTANT.SUPER_ADMIN,
      title: CONSTANT.SUPER_ADMIN_TITLE,
      id: CONSTANT.SUPER_ADMIN
    },
    "/dashboard/setting": {
      screen: CONSTANT.SETTINGS,
      title: CONSTANT.SETTINGS_TITLE,
      id: CONSTANT.SETTINGS
    },
  }
  const navBarHeadings: Record<string, NavBarItem> = 
    user.role === "owner" ? ownerNavBarHeadings : 
    user.role === "beneficiary" ? beneficiaryNavBarHeadings : 
    user.role === "validator" ? validatorNavBarHeadings : 
    user.role === "admin" ? adminNavBarHeadings : 
    user.role === "super-admin" ? superAdminNavBarHeadings : 
    {}

  const OwnerDrawerMenu = [
    {
      icon: dashboardIcon,
      option: CONSTANT.DASHBOARD,
      navigate: () => {
        navigate("/dashboard")
        setSelectedOption(CONSTANT.DASHBOARD)
      },
    },
    {
      icon: assets,
      option: CONSTANT.MY_ASSETS,
      navigate: () => {
        navigate("/dashboard/assets")
        setSelectedOption(CONSTANT.MY_ASSETS)
      },
    },
    {
      icon: beneficiaries,
      option: CONSTANT.BENEFICIARIES,
      navigate: () => {
        navigate("/dashboard/beneficiaries")
        setSelectedOption(CONSTANT.BENEFICIARIES)
      },
    },
    {
      icon: validator,
      option: CONSTANT.VALIDATORS,
      navigate: () => {
        navigate("/dashboard/validators")
        setSelectedOption(CONSTANT.VALIDATORS)
      },
    },
    {
      icon: pulseCheck,
      option: CONSTANT.PULSE_CHECK,
      navigate: () => {
        navigate("/dashboard/pulse")
        setSelectedOption(CONSTANT.PULSE_CHECK)
      },
    },
  ]
  const beneficiaryDrawerMenu = [
    {
      icon: dashboardIcon,
      option: CONSTANT.TESTAMENT,
      navigate: () => {
        navigate("/dashboard")
        setSelectedOption(CONSTANT.TESTAMENT)
      },
    },
    {
      icon: assets,
      option: CONSTANT.ASSETS,
      navigate: () => {
        navigate("/dashboard/assets")
        setSelectedOption(CONSTANT.ASSETS)
      },
    },
    {
      icon: setting,
      option: CONSTANT.HELP,
      navigate: () => {
        navigate("/dashboard/help")
        setSelectedOption(CONSTANT.HELP)
      },
    },
  ]
  const validatorDrawerMenu = [
    {
      icon: dashboardIcon,
      option: CONSTANT.VALIDATION,
      navigate: () => {
        navigate("/dashboard")
        setSelectedOption(CONSTANT.VALIDATION_TITLE)
      },
    },
    {
      icon: setting,
      option: CONSTANT.HELP,
      navigate: () => {
        navigate("/dashboard/help")
        setSelectedOption(CONSTANT.HELP)
      },
    },
  ]
  const adminDrawerMenu = [
    {
      icon: dashboardIcon,
      option: CONSTANT.ADMIN,
      navigate: () => {
        navigate("/dashboard")
        setSelectedOption(CONSTANT.ADMIN_TITLE)
      },
    },
    {
      icon: setting,
      option: CONSTANT.SETTINGS,
      navigate: () => {
        navigate("/dashboard/setting")
        setSelectedOption(CONSTANT.SETTINGS_TITLE)
      },
    },
  ]
  const superAdminDrawerMenu = [
    {
      icon: dashboardIcon,
      option: CONSTANT.SUPER_ADMIN,
      navigate: () => {
        navigate("/dashboard")
        setSelectedOption(CONSTANT.SUPER_ADMIN_TITLE)
      },
    },
    {
      icon: setting,
      option: CONSTANT.SETTINGS,
      navigate: () => {
        navigate("/dashboard/setting")
        setSelectedOption(CONSTANT.SETTINGS_TITLE)
      },
    },
  ]
  const DRAWER_MENU = 
    user.role === "owner" ? OwnerDrawerMenu :
    user.role === "beneficiary" ? beneficiaryDrawerMenu :
    user.role === "validator" ? validatorDrawerMenu :
    user.role === "admin" ? adminDrawerMenu :
    user.role === "super-admin" ? superAdminDrawerMenu :
    []

  const DRAWER_SETTINGS = user.role === "owner" ? [
    {
      icon: profile,
      option: CONSTANT.MY_ACCOUNT,
      navigate: () => {
        navigate("/dashboard/account")
        setSelectedOption(CONSTANT.MY_ACCOUNT)
      },
    },
    {
      icon: setting,
      option: CONSTANT.HELP,
      navigate: () => {
        navigate("/dashboard/help")
        setSelectedOption(CONSTANT.HELP)
      },
    },
  ] : []
  // TODO manually terminate the session on catch
  const _handleLogout = () => {
    dispatch(logout({}))
      .unwrap()
      .catch()
      .finally(() => {
        navigate("/login")
      })
  }

  return (
    <div className={styles.App}>
      <NavigationDrawer
        DRAWER_MENU={DRAWER_MENU}
        DRAWER_SETTINGS={DRAWER_SETTINGS}
        _handleLogout={_handleLogout}
        selectedOption={selectedOption}
      />
      <section className={styles.DashboardBody}>
        <DashboardNavbar
          _handleLogout={_handleLogout}
          navBarHeadings={navBarHeadings}
          currentPath={selectedPath}
        />
        <Outlet />
      </section>
    </div>
  )
}

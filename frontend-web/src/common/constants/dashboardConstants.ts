import { CONSTANT, ROUTE_CONSTANTS } from "."
import dashboardIcon from "@images/dashboard.svg"
import assets from "@images/assets.svg"
import beneficiaries from "@images/beneeficiaries.svg"
import validator from "@images/validarors.svg"
import pulseCheck from "@images/pulse-check.svg"
import setting from "@images/Setting.svg"
import profile from "@images/Profile.svg"

type NavBarItem = {
  screen: string
  title: string
  id: string
}

export const getNavBarHeadings = (role: string) => {
  return role === "owner"
    ? ownerNavBarHeadings
    : role === "beneficiary"
    ? beneficiaryNavBarHeadings
    : role === "validator"
    ? validatorNavBarHeadings
    : role === "admin"
    ? adminNavBarHeadings
    : role === "super-admin"
    ? superAdminNavBarHeadings
    : {}
}

export const getDashboardDrawerMenu = (role: string) => {
  return role === "owner"
    ? ownerDrawerMenu
    : role === "beneficiary"
    ? beneficiaryDrawerMenu
    : role === "validator"
    ? validatorDrawerMenu
    : role === "admin"
    ? adminDrawerMenu
    : role === "super-admin"
    ? superAdminDrawerMenu
    : []
}

export const getDashboardDrawerSettings = (role: string) => {
  return role === "owner" ? ownerDrawerSettings : []
}

export const ownerNavBarHeadings: Record<string, NavBarItem> = {
  "/dashboard": {
    screen: CONSTANT.DASHBOARD,
    title: CONSTANT.DASHBOARD_TITLE,
    id: CONSTANT.DASHBOARD,
  },
  "/dashboard/assets": {
    screen: CONSTANT.MY_ASSETS,
    title: CONSTANT.MY_ASSETS_TITLE,
    id: CONSTANT.MY_ASSETS,
  },
  "/dashboard/beneficiaries": {
    screen: CONSTANT.BENEFICIARIES,
    title: CONSTANT.BENEFICIARIES_TITLE,
    id: CONSTANT.BENEFICIARIES,
  },
  "/dashboard/validators": {
    screen: CONSTANT.VALIDATORS,
    title: CONSTANT.VALIDATORS_TITLE,
    id: CONSTANT.VALIDATORS,
  },
  "/dashboard/pulse": {
    screen: CONSTANT.PULSE_CHECK,
    title: CONSTANT.PULSE_CHECK_TITLE,
    id: CONSTANT.PULSE_CHECK,
  },
  "/dashboard/account": {
    screen: CONSTANT.MY_ACCOUNT,
    title: CONSTANT.MY_ACCOUNT_TITLE,
    id: CONSTANT.MY_ACCOUNT,
  },
  "/dashboard/help": {
    screen: CONSTANT.HELP,
    title: CONSTANT.HELP_TITLE,
    id: CONSTANT.HELP,
  },
}
export const beneficiaryNavBarHeadings: Record<string, NavBarItem> = {
  "/dashboard": {
    screen: CONSTANT.TESTAMENT,
    title: CONSTANT.TESTAMENT_TITLE,
    id: CONSTANT.TESTAMENT,
  },
  "/dashboard/assets": {
    screen: CONSTANT.ASSETS,
    title: CONSTANT.ASSETS_TITLE,
    id: CONSTANT.ASSETS,
  },
  "/dashboard/help": {
    screen: CONSTANT.HELP,
    title: CONSTANT.HELP_TITLE,
    id: CONSTANT.HELP,
  },
}
export const validatorNavBarHeadings: Record<string, NavBarItem> = {
  "/dashboard": {
    screen: CONSTANT.VALIDATION,
    title: CONSTANT.VALIDATION_TITLE,
    id: CONSTANT.VALIDATION,
  },
  "/dashboard/help": {
    screen: CONSTANT.HELP,
    title: CONSTANT.HELP_TITLE,
    id: CONSTANT.HELP,
  },
}
export const adminNavBarHeadings: Record<string, NavBarItem> = {
  "/dashboard": {
    screen: CONSTANT.ADMIN,
    title: CONSTANT.ADMIN_TITLE,
    id: CONSTANT.ADMIN,
  },
  "/dashboard/requests": {
    screen: CONSTANT.ADMIN_REQUESTS,
    title: CONSTANT.ADMIN_REQUESTS_TITLE,
    id: CONSTANT.ADMIN_REQUESTS,
  },
  "/dashboard/setting": {
    screen: CONSTANT.SETTINGS,
    title: CONSTANT.SETTINGS_TITLE,
    id: CONSTANT.SETTINGS,
  },
}
export const superAdminNavBarHeadings: Record<string, NavBarItem> = {
  "/dashboard": {
    screen: CONSTANT.SUPER_ADMIN,
    title: CONSTANT.SUPER_ADMIN_TITLE,
    id: CONSTANT.SUPER_ADMIN,
  },
  "/dashboard/setting": {
    screen: CONSTANT.SETTINGS,
    title: CONSTANT.SETTINGS_TITLE,
    id: CONSTANT.SETTINGS,
  },
}

export const ownerDrawerMenu = [
  {
    icon: dashboardIcon,
    option: CONSTANT.DASHBOARD,
    navigate: ROUTE_CONSTANTS.DASHBOARD,
  },
  {
    icon: assets,
    option: CONSTANT.MY_ASSETS,
    navigate: `${ROUTE_CONSTANTS.DASHBOARD}/${ROUTE_CONSTANTS.DASHBOARD_ASSETS}`,
  },
  {
    icon: beneficiaries,
    option: CONSTANT.BENEFICIARIES,
    navigate: `${ROUTE_CONSTANTS.DASHBOARD}/${ROUTE_CONSTANTS.DASHBOARD_BENEFICIARIES}`,
  },
  {
    icon: validator,
    option: CONSTANT.VALIDATORS,
    navigate: `${ROUTE_CONSTANTS.DASHBOARD}/${ROUTE_CONSTANTS.DASHBOARD_VALIDATORS}`,
  },
  {
    icon: pulseCheck,
    option: CONSTANT.PULSE_CHECK,
    navigate: `${ROUTE_CONSTANTS.DASHBOARD}/${ROUTE_CONSTANTS.DASHBOARD_PULSE}`,
  },
]
export const beneficiaryDrawerMenu = [
  {
    icon: dashboardIcon,
    option: CONSTANT.TESTAMENT,
    navigate: ROUTE_CONSTANTS.DASHBOARD,
  },
  {
    icon: assets,
    option: CONSTANT.ASSETS,
    navigate: `${ROUTE_CONSTANTS.DASHBOARD}/${ROUTE_CONSTANTS.DASHBOARD_ASSETS}`,
  },
  {
    icon: setting,
    option: CONSTANT.HELP,
    navigate: `${ROUTE_CONSTANTS.DASHBOARD}/${ROUTE_CONSTANTS.DASHBOARD_HELP}`,
  },
]
export const validatorDrawerMenu = [
  {
    icon: dashboardIcon,
    option: CONSTANT.VALIDATION,
    navigate: `${ROUTE_CONSTANTS.DASHBOARD}`,
  },
  {
    icon: setting,
    option: CONSTANT.HELP,
    navigate: `${ROUTE_CONSTANTS.DASHBOARD}/${ROUTE_CONSTANTS.DASHBOARD_HELP}`,
  },
]
export const adminDrawerMenu = [
  {
    icon: dashboardIcon,
    option: CONSTANT.ADMIN,
    navigate: `${ROUTE_CONSTANTS.DASHBOARD}`,
  },
  {
    icon: dashboardIcon,
    option: CONSTANT.ADMIN_REQUESTS,
    navigate: `${ROUTE_CONSTANTS.DASHBOARD_REQUESTS}`,
  },
  {
    icon: setting,
    option: CONSTANT.SETTINGS,
    navigate: `${ROUTE_CONSTANTS.DASHBOARD}/${ROUTE_CONSTANTS.DASHBOARD_SETTINGS}`,
  },
]
export const superAdminDrawerMenu = [
  {
    icon: dashboardIcon,
    option: CONSTANT.SUPER_ADMIN,
    navigate: `${ROUTE_CONSTANTS.DASHBOARD}`,
  },
  {
    icon: setting,
    option: CONSTANT.SETTINGS,
    navigate: `${ROUTE_CONSTANTS.DASHBOARD}/${ROUTE_CONSTANTS.DASHBOARD_SETTINGS}`,
  },
]
export const ownerDrawerSettings = [
  {
    icon: profile,
    option: CONSTANT.MY_ACCOUNT,
    navigate: `${ROUTE_CONSTANTS.DASHBOARD}/${ROUTE_CONSTANTS.DASHBOARD_ACCOUNT}`,
  },
  {
    icon: setting,
    option: CONSTANT.HELP,
    navigate: `${ROUTE_CONSTANTS.DASHBOARD}/${ROUTE_CONSTANTS.DASHBOARD_HELP}`,
  },
]

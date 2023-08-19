import styles from "./Dashboard.module.css"
import { useTranslation } from "react-i18next"
import { NavigationDrawer } from "./NavigationDrawer"
import { DashboardNavbar } from "./DashboardNavbar"
import { Outlet, useNavigate } from "react-router-dom"
import { CONSTANT } from "../../common"
import { useAppDispatch } from "../../redux/hooks"
import { logout } from "../../redux/actions/UserActions"
import dashboardIcon from "../../../assets/images/dashboard.svg"
import assets from "../../../assets/images/assets.svg"
import beneficiaries from "../../../assets/images/beneeficiaries.svg"
import validator from "../../../assets/images/validarors.svg"
import pulseCheck from "../../../assets/images/pulse-check.svg"
import profile from "../../../assets/images/Profile.svg"
import setting from "../../../assets/images/Setting.svg"

console.log(beneficiaries)

export function Dashboard() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const _handleLogout = () => {
    dispatch(logout({}))
      .unwrap()
      .then((response) => {
        console.log(response)
        navigate("/login")
      })
  }

  return (
    <div className={styles.App}>
      <NavigationDrawer
        DRAWER_MENU={DRAWER_MENU}
        DRAWER_SETTINGS={DRAWER_SETTINGS}
      />
      <div className={styles.DashboardBody}>
        <DashboardNavbar />
        <Outlet />
      </div>
    </div>
  )
}

const DRAWER_MENU = [
  {
    icon: dashboardIcon,
    option: CONSTANT.DASHBOARD,
  },
  {
    icon: assets,
    option: CONSTANT.MY_ASSETS,
  },
  {
    icon: beneficiaries,
    option: CONSTANT.BENEFICIARIES,
  },
  {
    icon: validator,
    option: CONSTANT.VALIDATORS,
  },
  {
    icon: pulseCheck,
    option: CONSTANT.PULSE_CHECK,
  },
]
const DRAWER_SETTINGS = [
  {
    icon: profile,
    option: CONSTANT.MY_ACCOUNT,
  },
  {
    icon: setting,
    option: CONSTANT.HELP,
  },
]

import styles from "./Dashboard.module.css"
import { useTranslation } from "react-i18next"
import { NavigationDrawer } from "./NavigationDrawer"
import { DashboardNavbar } from "./DashboardNavbar"
import { Outlet, useNavigate } from "react-router-dom"
import { CONSTANT } from "../../common"
import { useAppDispatch } from "../../redux/hooks"
import { logout } from "../../redux/actions/UserActions"

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
    icon: "Icon",
    option: CONSTANT.DASHBOARD,
  },
  {
    icon: "Icon",
    option: CONSTANT.MY_ASSETS,
  },
  {
    icon: "Icon",
    option: CONSTANT.BENEFICIARIES,
  },
  {
    icon: "Icon",
    option: CONSTANT.VALIDATORS,
  },
  {
    icon: "Icon",
    option: CONSTANT.PULSE_CHECK,
  },
]
const DRAWER_SETTINGS = [
  {
    icon: "Icon",
    option: CONSTANT.MY_ACCOUNT,
  },
  {
    icon: "Icon",
    option: CONSTANT.HELP,
  },
]

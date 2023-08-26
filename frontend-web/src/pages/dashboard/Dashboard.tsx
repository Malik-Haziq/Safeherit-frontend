import styles from "./Dashboard.module.css"
import { NavigationDrawer } from "./NavigationDrawer"
import { DashboardNavbar } from "./DashboardNavbar"
import { Outlet, useNavigate } from "react-router-dom"
import { CONSTANT } from "../../common"
import dashboardIcon from "../../../assets/images/dashboard.svg"
import assets from "../../../assets/images/assets.svg"
import beneficiaries from "../../../assets/images/beneeficiaries.svg"
import validator from "../../../assets/images/validarors.svg"
import pulseCheck from "../../../assets/images/pulse-check.svg"
import profile from "../../../assets/images/Profile.svg"
import setting from "../../../assets/images/Setting.svg"
import { useAppDispatch } from "../../redux/hooks"
import { logout } from "../../redux/actions/UserActions"

console.log(beneficiaries)

export function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const DRAWER_MENU = [
    {
      icon: dashboardIcon,
      option: CONSTANT.DASHBOARD,
      navigate: () => {
        navigate("/dashboard")
      },
    },
    {
      icon: assets,
      option: CONSTANT.MY_ASSETS,
      navigate: () => {
        navigate("/dashboard/assets")
      },
    },
    {
      icon: beneficiaries,
      option: CONSTANT.BENEFICIARIES,
      navigate: () => {
        navigate("/dashboard/beneficiaries")
      },
    },
    {
      icon: validator,
      option: CONSTANT.VALIDATORS,
      navigate: () => {
        navigate("/dashboard/validators")
      },
    },
    {
      icon: pulseCheck,
      option: CONSTANT.PULSE_CHECK,
      navigate: () => {
        navigate("/dashboard/pulse")
      },
    },
  ]
  const DRAWER_SETTINGS = [
    {
      icon: profile,
      option: CONSTANT.MY_ACCOUNT,
      navigate: () => {
        navigate("/dashboard")
      },
    },
    {
      icon: setting,
      option: CONSTANT.HELP,
      navigate: () => {
        navigate("/dashboard")
      },
    },
  ]
  // TODO manually terminate the session on catch
  const _handleLogout = () => {
    dispatch(logout({}))
      .unwrap()
      .catch((err) => {
        alert(err?.code)
      })
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
      />
      <section className={styles.DashboardBody}>
        <DashboardNavbar _handleLogout={_handleLogout} />
        <Outlet />
      </section>
    </div>
  )
}

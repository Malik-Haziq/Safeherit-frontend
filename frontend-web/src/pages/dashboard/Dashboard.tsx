import { lazy, useState } from "react"
import styles from "./Dashboard.module.css"
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

const NavigationDrawer = lazy(() => import("./NavigationDrawer"))
const DashboardNavbar = lazy(() => import("./DashboardNavbar"))

export default function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [selectedOption, setSelectedOption] = useState(CONSTANT.DASHBOARD)

  const DRAWER_MENU = [
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
  const DRAWER_SETTINGS = [
    {
      icon: profile,
      option: CONSTANT.MY_ACCOUNT,
      navigate: () => {
        navigate("/dashboard")
        setSelectedOption(CONSTANT.MY_ACCOUNT)
      },
    },
    {
      icon: setting,
      option: CONSTANT.HELP,
      navigate: () => {
        navigate("/dashboard")
        setSelectedOption(CONSTANT.HELP)
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
        selectedOption={selectedOption}
      />
      <section className={styles.DashboardBody}>
        <DashboardNavbar _handleLogout={_handleLogout} />
        <Outlet />
      </section>
    </div>
  )
}
